import { NextResponse } from "next/server";
import {
  createRecordInTable,
  listAirtableTableSummaries,
} from "@/lib/airtable";
import {
  formatAirtableEnvError,
  getAirtableEnv,
} from "@/lib/airtable-env";
import { emailValidationError } from "@/lib/form-validation";

/**
 * Buy used car submissions land in the same Airtable base as the rest of the site
 * (**AIRTABLE_BASE_ID**, the `app…` id) but in a dedicated tab named by
 * **AIRTABLE_BUY_USED_CARS_TABLE_NAME** (default `Buy used cars`).
 *
 * Optional **AIRTABLE_BUY_USED_CARS_TABLE_ID** (`tbl…` from the URL when that
 * tab is open) is used only when the Metadata API does not list the tab.
 *
 * Expected fields on the table:
 * Full Name, Email, Phone, City, Vehicle Type, Vehicle Brand, Vehicle Model,
 * Vehicle Color, Transmission, Fuel Type, Features, Budget, Finance, Notes,
 * Request Type.
 */

const REQUEST_TYPE = "Buy Used Car";

function readBuyUsedCarsTableName(): string {
  const nameRaw = process.env["AIRTABLE_BUY_USED_CARS_TABLE_NAME"];
  if (typeof nameRaw === "string") {
    const v = nameRaw.trim().replace(/^['"]|['"]$/g, "");
    if (v) return v;
  }
  return "Buy used car";
}

function readBuyUsedCarsTableIdFallback(): string | null {
  const raw = process.env["AIRTABLE_BUY_USED_CARS_TABLE_ID"];
  if (typeof raw !== "string") return null;
  const id = raw.trim().replace(/^['"]|['"]$/g, "");
  return /^tbl[a-zA-Z0-9]+$/i.test(id) ? id : null;
}

function resolveTableIdByName(
  tables: { id: string; name: string }[],
  name: string,
): { id: string } | null {
  const exact = tables.find((t) => t.name === name);
  if (exact) return { id: exact.id };
  const lower = name.toLowerCase();
  const folded = tables.find((t) => t.name.toLowerCase() === lower);
  if (folded) return { id: folded.id };
  return null;
}

function formatTableList(tables: { id: string; name: string }[]): string {
  return tables.map((t) => `"${t.name}"`).join(", ") || "(none)";
}

function wrongBaseHint(
  tables: { id: string; name: string }[],
  configuredName: string,
  configuredBaseId: string,
): string {
  const list = formatTableList(tables);
  const tableIdHint = readBuyUsedCarsTableIdFallback()
    ? ""
    : ` Or set AIRTABLE_BUY_USED_CARS_TABLE_ID to the tbl… id from the URL when the "${configuredName}" tab is open.`;
  return (
    `Tables visible to the API for base ${configuredBaseId}: ${list}. ` +
    `Could not use "${configuredName}".${tableIdHint}`
  );
}

export type BuyUsedCarsJsonBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  vehicleType?: string;
  vehicleModel?: string;
  vehicleBrand?: string;
  vehicleColor?: string;
  transmission?: string;
  fuelType?: string;
  features?: unknown;
  budget?: string;
  finance?: string;
  notes?: string;
};

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function parseJsonBody(raw: unknown): BuyUsedCarsJsonBody | null {
  if (!raw || typeof raw !== "object") return null;
  return raw as BuyUsedCarsJsonBody;
}

function parseFeatures(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((v) => String(v ?? "").trim())
      .filter((v) => v.length > 0);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((v) => String(v ?? "").trim())
          .filter((v) => v.length > 0);
      }
    } catch {
      /* fall through to comma split */
    }
    return trimmed
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
  }
  return [];
}

async function tryCreate(
  tablePathSegment: string,
  fields: Record<string, unknown>,
): Promise<{ ok: true } | { error: string }> {
  try {
    await createRecordInTable(tablePathSegment, fields);
    return { ok: true };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Submission failed. Please try again.";
    return { error: message };
  }
}

async function createBuyUsedCarsRecord(
  configuredName: string,
  fields: Record<string, unknown>,
): Promise<{ ok: true } | { error: string }> {
  const env = getAirtableEnv();
  const configuredBaseId = env.ok ? env.config.baseId : "";

  let tables: { id: string; name: string }[] = [];
  try {
    tables = await listAirtableTableSummaries();
  } catch (metaErr) {
    const metaMsg =
      metaErr instanceof Error ? metaErr.message : String(metaErr);
    const tableId = readBuyUsedCarsTableIdFallback();
    if (tableId) {
      const r = await tryCreate(tableId, fields);
      if ("ok" in r) return r;
    }
    const byName = await tryCreate(configuredName, fields);
    if ("ok" in byName) return byName;
    return {
      error:
        `Could not load Airtable schema (${metaMsg}). ${byName.error} ` +
        `Ensure the token has schema.bases:read and data.records:write.`,
    };
  }

  const resolved = resolveTableIdByName(tables, configuredName);
  if (resolved) {
    const r = await tryCreate(resolved.id, fields);
    if ("ok" in r) return r;
    return {
      error: `${r.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
    };
  }

  const tableId = readBuyUsedCarsTableIdFallback();
  if (tableId) {
    const r = await tryCreate(tableId, fields);
    if ("ok" in r) return r;
    return {
      error: `${r.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
    };
  }

  const byName = await tryCreate(configuredName, fields);
  if ("ok" in byName) return byName;

  return {
    error: `${byName.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
  };
}

export async function handleBuyUsedCarsSubmission(
  request: Request,
): Promise<NextResponse> {
  const env = getAirtableEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatAirtableEnvError(env.missing) },
      { status: 500 },
    );
  }

  let body: BuyUsedCarsJsonBody | null;
  try {
    body = parseJsonBody(await request.json());
  } catch {
    return validationError("Invalid JSON body");
  }

  if (!body) return validationError("Invalid JSON body");

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const city = String(body.city ?? "").trim();
  const vehicleType = String(body.vehicleType ?? "").trim();
  const vehicleModel = String(body.vehicleModel ?? "").trim();
  const vehicleBrand = String(body.vehicleBrand ?? "").trim();
  const vehicleColor = String(body.vehicleColor ?? "").trim();
  const transmission = String(body.transmission ?? "").trim();
  const fuelType = String(body.fuelType ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const finance = String(body.finance ?? "").trim();
  const notes = String(body.notes ?? "").trim();
  const features = parseFeatures(body.features);

  if (
    !fullName ||
    !phone ||
    !city ||
    !vehicleType ||
    !vehicleModel ||
    !vehicleBrand ||
    !vehicleColor ||
    !transmission ||
    !fuelType ||
    !budget ||
    !finance
  ) {
    return validationError("Please fill in all required fields.");
  }

  if (!/^\d{10}$/.test(phone)) {
    return validationError("Enter a valid 10-digit phone number.");
  }

  const emailErr = emailValidationError(email);
  if (emailErr) return validationError(emailErr);

  if (!/^[A-Za-z ]+$/.test(vehicleModel)) {
    return validationError("Vehicle Model can only contain alphabets.");
  }

  if (!/^\d+$/.test(budget)) {
    return validationError("Budget must be a number.");
  }

  const fields: Record<string, unknown> = {
    "Full Name": fullName,
    Phone: phone,
    City: city,
    "Vehicle Type": vehicleType,
    "Vehicle Brand": vehicleBrand,
    "Vehicle Model": vehicleModel,
    "Vehicle Color": vehicleColor,
    Transmission: transmission,
    "Fuel Type": fuelType,
    Budget: Number(budget),
    Finance: finance,
    "Request Type": REQUEST_TYPE,
  };
  if (email) fields.Email = email;
  if (features.length > 0) fields.Features = features;
  if (notes) fields.Notes = notes;

  const configuredName = readBuyUsedCarsTableName();
  const result = await createBuyUsedCarsRecord(configuredName, fields);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true as const });
}

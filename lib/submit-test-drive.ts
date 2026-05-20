import { NextResponse } from "next/server";
import {
  createRecordInTable,
  listAirtableTableSummaries,
} from "@/lib/airtable";
import {
  formatAirtableEnvError,
  getAirtableEnv,
} from "@/lib/airtable-env";
import { branches } from "@/lib/site-content";

/**
 * Test drive rows use **AIRTABLE_BASE_ID** (the `app…` in the base URL).
 * Table tab name: **AIRTABLE_TEST_DRIVE_TABLE_NAME** (default `Test drive requests`).
 *
 * Optional **AIRTABLE_TEST_DRIVE_TABLE_ID** (`tbl…` from the URL when that tab is open):
 * used only when the Metadata API does not list that tab (common when `.env.local`
 * pointed at a different base than the one in the browser).
 *
 * Fields on the test-drive table:
 * Full Name, Email, Phone, Vehicle, Preferred Date, Driver License, Branch, Notes.
 */

const BRANCH_NAMES = new Set(branches.map((b) => b.name));

function readTestDriveTableName(): string {
  const nameRaw = process.env["AIRTABLE_TEST_DRIVE_TABLE_NAME"];
  if (typeof nameRaw === "string") {
    const v = nameRaw.trim().replace(/^['"]|['"]$/g, "");
    if (v) return v;
  }
  return "Test drive requests";
}

/** Optional `tbl…` from the table URL when schema API omits the tab. */
function readTestDriveTableIdFallback(): string | null {
  const raw = process.env["AIRTABLE_TEST_DRIVE_TABLE_ID"];
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
  const tableIdHint = readTestDriveTableIdFallback()
    ? ""
    : ` Or set AIRTABLE_TEST_DRIVE_TABLE_ID to the tbl… id from the URL when the "${configuredName}" tab is open.`;
  return (
    `Tables visible to the API for base ${configuredBaseId}: ${list}. ` +
    `Could not use "${configuredName}". ` +
    `If .env.local has a different AIRTABLE_BASE_ID than your browser URL (app…), fix that first — ` +
    `for nepalmotor.com use appVSOoJqoGXs4tAZ.${tableIdHint}`
  );
}

export type TestDriveJsonBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  vehicle?: string;
  preferredDate?: string;
  driverLicense?: string;
  branch?: string;
  notes?: string;
};

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function parseJsonBody(raw: unknown): TestDriveJsonBody | null {
  if (!raw || typeof raw !== "object") return null;
  return raw as TestDriveJsonBody;
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

async function createTestDriveRecord(
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
    const tableId = readTestDriveTableIdFallback();
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
    return { error: `${r.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}` };
  }

  const tableId = readTestDriveTableIdFallback();
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

export async function handleTestDriveSubmission(
  request: Request,
): Promise<NextResponse> {
  const env = getAirtableEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatAirtableEnvError(env.missing) },
      { status: 500 },
    );
  }

  let body: TestDriveJsonBody | null;
  try {
    body = parseJsonBody(await request.json());
  } catch {
    return validationError("Invalid JSON body");
  }

  if (!body) return validationError("Invalid JSON body");

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const vehicle = String(body.vehicle ?? "").trim();
  const preferredDate = String(body.preferredDate ?? "").trim();
  const driverLicense = String(body.driverLicense ?? "").trim();
  const branch = String(body.branch ?? "").trim();
  const notes = String(body.notes ?? "").trim();

  if (!fullName || !email || !phone || !vehicle || !preferredDate || !branch) {
    return validationError("Please fill in all required fields.");
  }

  if (!BRANCH_NAMES.has(branch)) {
    return validationError("Invalid branch selection.");
  }

  const fields: Record<string, unknown> = {
    "Full Name": fullName,
    Email: email,
    Phone: phone,
    Vehicle: vehicle,
    "Preferred Date": preferredDate,
    Branch: branch,
  };
  if (driverLicense) fields["Driver License"] = driverLicense;
  if (notes) fields.Notes = notes;

  const configuredName = readTestDriveTableName();
  const result = await createTestDriveRecord(configuredName, fields);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true as const });
}

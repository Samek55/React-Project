import {
  listAirtableTableSummaries,
  listRecordsInTable,
} from "@/lib/airtable";
import { getAirtableEnv } from "@/lib/airtable-env";
import type { Branch } from "@/lib/site-content";
import { branches as staticBranches } from "@/lib/site-content";

/** Airtable Status values that show a dealer on the website. */
const AIRTABLE_SHOW_STATUS = new Set(["yes", "y"]);

function readDealersTableName(): string {
  const nameRaw = process.env["AIRTABLE_DEALERS_TABLE_NAME"];
  if (typeof nameRaw === "string") {
    const v = nameRaw.trim().replace(/^['"]|['"]$/g, "");
    if (v) return v;
  }
  return "Dealers";
}

function readDealersTableIdFallback(): string | null {
  const raw = process.env["AIRTABLE_DEALERS_TABLE_ID"];
  if (typeof raw !== "string") return null;
  const id = raw.trim().replace(/^['"]|['"]$/g, "");
  return /^tbl[a-zA-Z0-9]+$/i.test(id) ? id : null;
}

function resolveDealersTableRef(
  tables: { id: string; name: string }[],
  configuredName: string,
): string | null {
  const exact = tables.find((t) => t.name === configuredName);
  if (exact) return exact.id;
  const lower = configuredName.toLowerCase();
  const folded = tables.find((t) => t.name.toLowerCase() === lower);
  if (folded) return folded.id;
  return readDealersTableIdFallback() ?? configuredName;
}

function pickField(
  fields: Record<string, unknown>,
  ...keys: string[]
): unknown {
  for (const key of keys) {
    if (fields[key] != null && fields[key] !== "") return fields[key];
  }
  const lowerKeys = keys.map((k) => k.toLowerCase());
  for (const [name, value] of Object.entries(fields)) {
    if (value == null || value === "") continue;
    if (lowerKeys.includes(name.toLowerCase())) return value;
  }
  return undefined;
}

function fieldToString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "";
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === "string" ? v : String(v)))
      .join(", ")
      .trim();
  }
  return String(value).trim();
}

/** True when Airtable Status is Yes (checkbox checked or select "Yes"). */
export function isDealerStatusYes(status: unknown): boolean {
  if (status === true) return true;
  if (status === false || status == null) return false;
  const normalized = fieldToString(status).toLowerCase();
  return AIRTABLE_SHOW_STATUS.has(normalized);
}

function normalizePhone(value: unknown): string {
  const digits = fieldToString(value).replace(/\D/g, "");
  if (digits.length >= 10) return digits.slice(-10);
  return digits;
}

function recordToBranch(
  fields: Record<string, unknown>,
  recordId: string,
): Branch | null {
  const name = fieldToString(
    pickField(fields, "Company Name", "Dealer Name", "Name", "Branch"),
  );
  const location = fieldToString(pickField(fields, "City", "Location"));
  const contact = fieldToString(
    pickField(fields, "Full Name", "Contact", "Contact Name"),
  );
  const phone = normalizePhone(pickField(fields, "Phone", "Mobile", "Tel"));

  if (!name || !location || !phone) return null;

  return {
    name,
    location,
    contact: contact || name,
    phone,
    id: recordId,
  };
}

async function resolveDealersTable(): Promise<string | null> {
  const env = getAirtableEnv();
  if (!env.ok) return null;

  const configuredName = readDealersTableName();
  try {
    const tables = await listAirtableTableSummaries();
    return resolveDealersTableRef(tables, configuredName);
  } catch {
    return readDealersTableIdFallback() ?? configuredName;
  }
}

function phoneKey(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

/** Built-in dealers always stay; Airtable rows with Status Yes are added after. */
function mergeDealerBranches(
  builtIn: Branch[],
  fromAirtable: Branch[],
): Branch[] {
  const seen = new Set<string>();
  const merged: Branch[] = [];

  for (const branch of builtIn) {
    const key = phoneKey(branch.phone);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(branch);
  }

  for (const branch of fromAirtable) {
    const key = phoneKey(branch.phone);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(branch);
  }

  return merged;
}

/**
 * Returns all built-in dealer records plus Airtable Dealers where Status is Yes.
 * Built-in records are never removed, even if they are not in Airtable.
 */
export async function fetchActiveDealers(): Promise<Branch[]> {
  const tableRef = await resolveDealersTable();
  if (!tableRef) return [...staticBranches];

  try {
    const records = await listRecordsInTable(tableRef);
    const fromAirtable = records
      .filter((row) =>
        isDealerStatusYes(pickField(row.fields, "Status", "status")),
      )
      .map((row) => recordToBranch(row.fields, row.id))
      .filter((b): b is Branch => b != null);

    return mergeDealerBranches(staticBranches, fromAirtable);
  } catch {
    return [...staticBranches];
  }
}

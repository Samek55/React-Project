import { NextResponse } from "next/server";
import {
  createRecordInTable,
  listAirtableTableSummaries,
  uploadAttachmentToField,
} from "@/lib/airtable";
import {
  formatAirtableEnvError,
  getAirtableEnv,
} from "@/lib/airtable-env";
import { publishFilesForAirtable } from "@/lib/attachment-staging";

const AIRTABLE_API = "https://api.airtable.com/v0";

/**
 * Dealer applications land in the same Airtable base as the rest of the site
 * (**AIRTABLE_BASE_ID**, the `app…` id) but in a dedicated tab named by
 * **AIRTABLE_DEALERS_TABLE_NAME** (default `Dealers`).
 *
 * Optional **AIRTABLE_DEALERS_TABLE_ID** (`tbl…` from the URL when that tab is
 * open) is used only when the Metadata API does not list that tab.
 *
 * Expected fields on the Dealers table (parity with the mobile app's
 * Become a Dealer screen):
 * Full Name, Company Name, City, Phone, Email, Notes, Photos, Request Type.
 *
 * Accepts BOTH multipart/form-data (mobile FormData with `photos` files) and
 * application/json bodies, so the mobile dev can use the same endpoint.
 */

const REQUEST_TYPE = "Become a Dealer";

const ATTACHMENT_MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
};

/** Field-name aliases the route tries when uploading dealer photos. */
const PHOTO_FIELD_CANDIDATES = [
  "Showroom Photos",
  "Showroom Photo",
  "Showroom / Office Photo",
  "Showroom/Office Photo",
  "Office Photos",
  "Office Photo",
  "Photos",
  "Photo",
  "Upload Photo",
  "Attachments",
];

export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

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
  const tableIdHint = readDealersTableIdFallback()
    ? ""
    : ` Or set AIRTABLE_DEALERS_TABLE_ID to the tbl… id from the URL when the "${configuredName}" tab is open.`;
  return (
    `Tables visible to the API for base ${configuredBaseId}: ${list}. ` +
    `Could not use "${configuredName}".${tableIdHint}`
  );
}

export type DealerPhotoJson = {
  name?: string;
  type?: string;
  /** Base64 (with or without `data:` URL prefix). */
  data?: string;
};

export type DealerJsonBody = {
  fullName?: string;
  companyName?: string;
  city?: string;
  phone?: string;
  email?: string;
  notes?: string;
  photos?: DealerPhotoJson[];
};

type ParsedDealer = {
  fullName: string;
  companyName: string;
  city: string;
  phone: string;
  email: string;
  notes: string;
  photos: File[];
};

function validationError(message: string) {
  return NextResponse.json(
    { error: message },
    { status: 400, headers: CORS_HEADERS },
  );
}

function inferPhotoMime(name: string, declared?: string): string {
  if (declared && declared.includes("/")) return declared;
  const ext = name.split(".").pop()?.toLowerCase();
  return ATTACHMENT_MIME_BY_EXT[ext ?? ""] ?? "image/jpeg";
}

function decodeBase64Payload(data: string): Buffer {
  const commaIndex = data.indexOf(",");
  const payload =
    data.startsWith("data:") && commaIndex >= 0
      ? data.slice(commaIndex + 1)
      : data;
  return Buffer.from(payload, "base64");
}

function jsonPhotosToFiles(raw: DealerPhotoJson[] | undefined): File[] {
  if (!Array.isArray(raw)) return [];
  const out: File[] = [];
  for (const [i, entry] of raw.entries()) {
    if (!entry || typeof entry !== "object") continue;
    const data = typeof entry.data === "string" ? entry.data.trim() : "";
    if (!data) continue;
    const name =
      String(entry.name ?? `photo-${i + 1}.jpg`).trim() ||
      `photo-${i + 1}.jpg`;
    const type = inferPhotoMime(name, entry.type);
    try {
      const bytes = decodeBase64Payload(data);
      if (bytes.byteLength === 0) continue;
      const ab = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(ab).set(bytes);
      out.push(new File([ab], name, { type }));
    } catch {
      /* skip malformed entries */
    }
  }
  return out;
}

function collectPhotoFiles(form: FormData): File[] {
  const keys = [
    "photos",
    "photo",
    "images",
    "image",
    "showroomPhoto",
    "showroomPhotos",
  ];
  const seen = new Map<string, File>();
  for (const key of keys) {
    for (const value of form.getAll(key)) {
      if (
        typeof value === "object" &&
        value !== null &&
        "name" in (value as object)
      ) {
        const file = value as File;
        if (!file.name || file.size === 0) continue;
        const k = `${file.name}-${file.size}-${file.lastModified}`;
        if (!seen.has(k)) seen.set(k, file);
      }
    }
  }
  for (let i = 0; i < 10; i++) {
    const indexed =
      form.get(`photos[${i}]`) ?? form.get(`photo[${i}]`);
    if (
      indexed &&
      typeof indexed === "object" &&
      "name" in (indexed as object)
    ) {
      const file = indexed as File;
      if (file.name && file.size > 0) {
        const k = `${file.name}-${file.size}-${file.lastModified}`;
        if (!seen.has(k)) seen.set(k, file);
      }
    }
  }
  return Array.from(seen.values());
}

async function parseRequest(request: Request): Promise<ParsedDealer | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    let body: DealerJsonBody | null = null;
    try {
      const raw = await request.json();
      if (raw && typeof raw === "object") body = raw as DealerJsonBody;
    } catch {
      return null;
    }
    if (!body) return null;
    return {
      fullName: String(body.fullName ?? "").trim(),
      companyName: String(body.companyName ?? "").trim(),
      city: String(body.city ?? "").trim() || "Kathmandu",
      phone: String(body.phone ?? "").trim(),
      email: String(body.email ?? "").trim(),
      notes: String(body.notes ?? "").trim(),
      photos: jsonPhotosToFiles(body.photos),
    };
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return null;
  }
  return {
    fullName: String(form.get("fullName") ?? "").trim(),
    companyName: String(form.get("companyName") ?? "").trim(),
    city: String(form.get("city") ?? "").trim() || "Kathmandu",
    phone: String(form.get("phone") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    notes: String(form.get("notes") ?? "").trim(),
    photos: collectPhotoFiles(form),
  };
}

async function tryCreate(
  tablePathSegment: string,
  fields: Record<string, unknown>,
): Promise<{ ok: true; recordId: string } | { error: string }> {
  try {
    const recordId = await createRecordInTable(tablePathSegment, fields);
    return { ok: true, recordId };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Submission failed. Please try again.";
    return { error: message };
  }
}

async function createDealerRecord(
  configuredName: string,
  fields: Record<string, unknown>,
): Promise<
  { ok: true; recordId: string; tableRef: string } | { error: string }
> {
  const env = getAirtableEnv();
  const configuredBaseId = env.ok ? env.config.baseId : "";

  let tables: { id: string; name: string }[] = [];
  try {
    tables = await listAirtableTableSummaries();
  } catch (metaErr) {
    const metaMsg =
      metaErr instanceof Error ? metaErr.message : String(metaErr);
    const tableId = readDealersTableIdFallback();
    if (tableId) {
      const r = await tryCreate(tableId, fields);
      if ("ok" in r) return { ...r, tableRef: tableId };
    }
    const byName = await tryCreate(configuredName, fields);
    if ("ok" in byName) return { ...byName, tableRef: configuredName };
    return {
      error:
        `Could not load Airtable schema (${metaMsg}). ${byName.error} ` +
        `Ensure the token has schema.bases:read and data.records:write.`,
    };
  }

  const resolved = resolveTableIdByName(tables, configuredName);
  if (resolved) {
    const r = await tryCreate(resolved.id, fields);
    if ("ok" in r) return { ...r, tableRef: resolved.id };
    return {
      error: `${r.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
    };
  }

  const tableId = readDealersTableIdFallback();
  if (tableId) {
    const r = await tryCreate(tableId, fields);
    if ("ok" in r) return { ...r, tableRef: tableId };
    return {
      error: `${r.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
    };
  }

  const byName = await tryCreate(configuredName, fields);
  if ("ok" in byName) return { ...byName, tableRef: configuredName };

  return {
    error: `${byName.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
  };
}

type AttachmentRef = { id?: string; url?: string };

async function getDealerRecordAttachments(
  tableRef: string,
  recordId: string,
  fieldName: string,
): Promise<AttachmentRef[]> {
  const env = getAirtableEnv();
  if (!env.ok) return [];
  const { baseId, token } = env.config;
  const res = await fetch(
    `${AIRTABLE_API}/${baseId}/${encodeURIComponent(tableRef)}/${recordId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) return [];
  const data = (await res.json().catch(() => ({}))) as {
    fields?: Record<string, Array<AttachmentRef> | undefined>;
  };
  const list = data.fields?.[fieldName];
  return Array.isArray(list) ? list.filter((a) => a.id || a.url) : [];
}

async function setDealerAttachmentUrls(
  tableRef: string,
  recordId: string,
  fieldName: string,
  newUrls: string[],
  existing: AttachmentRef[],
): Promise<void> {
  const env = getAirtableEnv();
  if (!env.ok) throw new Error("Airtable configuration missing");
  const { baseId, token } = env.config;

  const payload: Array<{ id: string } | { url: string }> = [];
  for (const item of existing) {
    if (item.id) payload.push({ id: item.id });
    else if (item.url) payload.push({ url: item.url });
  }
  for (const url of newUrls) payload.push({ url });

  const res = await fetch(
    `${AIRTABLE_API}/${baseId}/${encodeURIComponent(tableRef)}/${recordId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: { [fieldName]: payload },
        typecast: true,
      }),
    },
  );

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as {
      error?: { message?: string } | string;
    };
    const msg =
      typeof data.error === "string"
        ? data.error
        : data.error?.message ?? `Attachment update failed (${res.status})`;
    throw new Error(msg);
  }
}

async function uploadDealerPhotos(
  tableRef: string,
  recordId: string,
  photos: File[],
  request: Request,
): Promise<{ uploaded: number; failures: string[]; field?: string }> {
  if (photos.length === 0) return { uploaded: 0, failures: [] };

  const failures: string[] = [];
  let uploaded = 0;
  let resolvedField: string | undefined;

  const tryDirect = async (
    fieldName: string,
    file: File,
  ): Promise<boolean> => {
    try {
      await uploadAttachmentToField(recordId, fieldName, file);
      return true;
    } catch {
      return false;
    }
  };

  const tryUrlUpload = async (
    fieldName: string,
    file: File,
  ): Promise<boolean> => {
    try {
      const [url] = await publishFilesForAirtable([file], request);
      const existing = await getDealerRecordAttachments(
        tableRef,
        recordId,
        fieldName,
      );
      await setDealerAttachmentUrls(
        tableRef,
        recordId,
        fieldName,
        [url],
        existing,
      );
      return true;
    } catch {
      return false;
    }
  };

  for (const file of photos) {
    let success = false;

    if (resolvedField) {
      success =
        (await tryDirect(resolvedField, file)) ||
        (await tryUrlUpload(resolvedField, file));
    }

    if (!success) {
      for (const candidate of PHOTO_FIELD_CANDIDATES) {
        if (await tryDirect(candidate, file)) {
          resolvedField = candidate;
          success = true;
          break;
        }
      }
    }

    if (!success) {
      for (const candidate of PHOTO_FIELD_CANDIDATES) {
        if (await tryUrlUpload(candidate, file)) {
          resolvedField = candidate;
          success = true;
          break;
        }
      }
    }

    if (success) uploaded += 1;
    else failures.push(file.name);
  }

  return { uploaded, failures, field: resolvedField };
}

export async function handleBecomeADealerSubmission(
  request: Request,
): Promise<NextResponse> {
  const env = getAirtableEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatAirtableEnvError(env.missing) },
      { status: 500, headers: CORS_HEADERS },
    );
  }

  const parsed = await parseRequest(request);
  if (!parsed) return validationError("Invalid request body");

  const { fullName, companyName, city, phone, email, notes, photos } = parsed;

  if (!fullName || !companyName || !phone) {
    return validationError("Please fill in all required fields.");
  }

  if (!/^\d{10}$/.test(phone)) {
    return validationError("Enter a valid 10-digit phone number.");
  }

  if (photos.length > 5) {
    return validationError("You can upload at most 5 photos.");
  }

  const fields: Record<string, unknown> = {
    "Full Name": fullName,
    "Company Name": companyName,
    City: city || "Kathmandu",
    Phone: phone,
    "Request Type": REQUEST_TYPE,
  };
  if (email) fields.Email = email;
  if (notes) fields.Notes = notes;

  const configuredName = readDealersTableName();
  const created = await createDealerRecord(configuredName, fields);
  if ("error" in created) {
    return NextResponse.json(
      { error: created.error },
      { status: 502, headers: CORS_HEADERS },
    );
  }

  const photoUpload = await uploadDealerPhotos(
    created.tableRef,
    created.recordId,
    photos,
    request,
  );

  const body: Record<string, unknown> = {
    ok: true as const,
    recordId: created.recordId,
    received: {
      fullName,
      companyName,
      city: city || "Kathmandu",
      phone,
      email: email || undefined,
      notes: notes || undefined,
      photos: photos.length,
    },
    photoUpload,
  };

  if (photoUpload.failures.length > 0) {
    body.warning = `Saved, but these photos could not be uploaded to Airtable: ${photoUpload.failures.join(", ")}. Verify the "${configuredName}" table has an attachment column named one of: ${PHOTO_FIELD_CANDIDATES.join(", ")}.`;
  }

  return NextResponse.json(body, { headers: CORS_HEADERS });
}

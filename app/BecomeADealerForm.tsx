"use client";

import { useCallback, useId, useRef, useState } from "react";
import { FileUploadField } from "./FileUploadField";
import {
  BORDER,
  PillSelect,
  ResetIcon,
  textInputClass,
} from "./form-controls";

const CITIES = [
  "Itahari",
  "Kathmandu",
  "Pokhara",
  "Lalitpur",
  "Bharatpur",
  "Biratnagar",
  "Other",
];

const MAX_PHOTOS = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

function dedupeFiles(files: File[]): File[] {
  const seen = new Set<string>();
  const out: File[] = [];
  for (const f of files) {
    const key = `${f.name}-${f.size}-${f.lastModified}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
}

export function BecomeADealerForm() {
  const formId = useId();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [phone, setPhone] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const clear = useCallback(() => {
    setFullName("");
    setCompanyName("");
    setCity("Kathmandu");
    setPhone("");
    setPhotos([]);
    setSubmitError(null);
    setSubmitSuccess(null);
  }, []);

  const handleAddPhotos = useCallback((incoming: File[]) => {
    const accepted: File[] = [];
    let rejectedTooLarge = 0;
    let rejectedWrongType = 0;
    for (const file of incoming) {
      if (!file.type.startsWith("image/")) {
        rejectedWrongType += 1;
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        rejectedTooLarge += 1;
        continue;
      }
      accepted.push(file);
    }
    setPhotos((prev) =>
      dedupeFiles([...prev, ...accepted]).slice(0, MAX_PHOTOS),
    );
    if (rejectedTooLarge > 0 || rejectedWrongType > 0) {
      const msgs: string[] = [];
      if (rejectedWrongType > 0) {
        msgs.push(`${rejectedWrongType} non-image file(s) ignored`);
      }
      if (rejectedTooLarge > 0) {
        msgs.push(`${rejectedTooLarge} file(s) over 5 MB ignored`);
      }
      setSubmitError(msgs.join("; "));
    }
  }, []);

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!fullName.trim() || !companyName.trim() || phone.length !== 10) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("fullName", fullName.trim());
      data.append("companyName", companyName.trim());
      data.append("city", city);
      data.append("phone", phone.trim());
      for (const file of photos) {
        data.append("photos", file, file.name);
      }

      const res = await fetch("/api/become-a-dealer", {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        warning?: string;
      };

      if (!res.ok) {
        setSubmitError(json.error ?? "Submission failed. Please try again.");
        return;
      }

      clear();
      setSubmitSuccess(
        json.warning ?? "Thank you! Your dealer application has been submitted.",
      );
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fieldGap = "flex flex-col gap-6";

  return (
    <form id={formId} onSubmit={onSubmit} className={fieldGap} noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-name`} className="text-[13px] text-black">
          Full Name<span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-name`}
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-company`} className="text-[13px] text-black">
          Company Name<span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-company`}
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          autoComplete="organization"
        />
      </div>

      <PillSelect
        id={`${formId}-city`}
        label="City"
        required
        options={CITIES}
        value={city}
        onChange={setCity}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-phone`} className="text-[13px] text-black">
          Phone<span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-phone`}
          type="tel"
          inputMode="numeric"
          maxLength={10}
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          value={phone}
          onChange={(e) => setPhone(onlyDigits(e.target.value).slice(0, 10))}
          autoComplete="tel"
        />
      </div>

      <FileUploadField
        label={`Showroom / Office Photo (up to ${MAX_PHOTOS})`}
        files={photos}
        onFilesAdd={handleAddPhotos}
        onRemove={removePhoto}
        inputRef={photoInputRef}
        accept="image/*"
        variant="photo"
      />

      {submitError ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-800"
        >
          {submitError}
        </p>
      ) : null}
      {submitSuccess ? (
        <p
          role="status"
          className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-[13px] text-green-800"
        >
          {submitSuccess}
        </p>
      ) : null}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={clear}
          disabled={submitting}
          className="inline-flex items-center gap-1.5 text-[14px] text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-50"
        >
          <ResetIcon className="text-zinc-500" />
          Clear form
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-zinc-900 px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </div>

      <p className="pt-2 text-center text-[11px] leading-relaxed text-zinc-400">
        Do not submit passwords through this form. Report malicious form
      </p>
    </form>
  );
}

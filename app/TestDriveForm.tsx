"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { branches } from "@/lib/site-content";
import {
  BORDER,
  PillSelect,
  ResetIcon,
  textInputClass,
} from "./form-controls";

const BRANCH_OPTIONS = branches.map((b) => b.name);

function todayDateInputValue(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function TestDriveForm() {
  const formId = useId();
  const minDate = useMemo(() => todayDateInputValue(), []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [branch, setBranch] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const clear = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setVehicle("");
    setPreferredDate("");
    setDriverLicense("");
    setBranch("");
    setNotes("");
    setSubmitError(null);
    setSubmitSuccess(null);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !vehicle.trim() ||
      !preferredDate ||
      !branch
    ) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          vehicle: vehicle.trim(),
          preferredDate,
          driverLicense: driverLicense.trim(),
          branch,
          notes: notes.trim(),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setSubmitError(data.error ?? "Submission failed. Please try again.");
        return;
      }

      clear();
      setSubmitSuccess(
        "Thank you! Your test drive request has been submitted.",
      );
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldGap = "flex flex-col gap-6";

  return (
    <form id={formId} onSubmit={onSubmit} className={fieldGap} noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-name`} className="text-[13px] text-black">
          Full name<span className="text-red-600"> *</span>
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
        <label htmlFor={`${formId}-email`} className="text-[13px] text-black">
          Email<span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-phone`} className="text-[13px] text-black">
          Phone<span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-phone`}
          type="number"
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-vehicle`} className="text-[13px] text-black">
          Which car would you like to test drive?
          <span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-vehicle`}
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          placeholder="Make or model"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-date`} className="text-[13px] text-black">
          Preferred date<span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-date`}
          type="date"
          min={minDate}
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-license`} className="text-[13px] text-black">
          Driver license #
        </label>
        <input
          id={`${formId}-license`}
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          value={driverLicense}
          onChange={(e) => setDriverLicense(e.target.value)}
          autoComplete="off"
        />
      </div>

      <PillSelect
        id={`${formId}-branch`}
        label="Preferred branch"
        required
        options={BRANCH_OPTIONS}
        value={branch}
        onChange={setBranch}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-notes`} className="text-[13px] text-black">
          Anything we should know?
        </label>
        <textarea
          id={`${formId}-notes`}
          rows={5}
          className={textInputClass() + " resize-y min-h-[120px]"}
          style={{ borderColor: BORDER }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us about your test drive preferences and any special requirements you have."
        />
      </div>

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

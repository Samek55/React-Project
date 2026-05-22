"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  BORDER,
  PillSelect,
  ResetIcon,
  TAG_BG,
  TAG_TEXT,
  textInputClass,
} from "./form-controls";
import { FormLegalConsent, LEGAL_CONSENT_ERROR } from "./FormLegalConsent";
import { emailValidationError } from "@/lib/form-validation";

const CITIES = [
  "Itahari",
  "Kathmandu",
  "Pokhara",
  "Lalitpur",
  "Bharatpur",
  "Biratnagar",
  "Other",
];

const VEHICLE_TYPES = [
  "Hatchback",
  "Sedan",
  "SUV",
  "Crossover",
  "Pickup",
  "Van",
  "Other",
];

const COLORS = [
  "White",
  "Black",
  "Silver",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Any",
];

const TRANSMISSION = ["Manual", "Automatic", "Semi Automatic", "CVT", "Other"];

const FUEL_TYPES_WITH_EV = [
  "Petrol",
  "Diesel",
  "EV",
  "Hybrid",
  "CNG",
  "LPG",
  "Other",
];

const YES_NO = ["Yes", "No"];

const FEATURE_PRESETS = [
  "Basic",
  "A/C",
  "4WD",
  "ABS",
  "Airbags",
  "Power Steering",
  "Power Windows",
  "Central Locking",
  "Music System",
  "Alloy Wheels",
  "Fog Lamps",
  "Sunroof",
  "Leather Seats",
  "Backup Camera",
  "Cruise Control",
  "Keyless Entry",
];

const ALPHABET_ONLY = /^[A-Za-z ]+$/;
const onlyAlpha = (v: string) => v.replace(/[^A-Za-z ]/g, "");
const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

export function TestDriveForm() {
  const formId = useId();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [vehicleType, setVehicleType] = useState("Hatchback");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [features, setFeatures] = useState<string[]>([]);
  const [featuresPickerOpen, setFeaturesPickerOpen] = useState(false);
  const [finance, setFinance] = useState("");
  const [notes, setNotes] = useState("");

  const [agreedToLegal, setAgreedToLegal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [modelError, setModelError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const featuresPickerRef = useRef<HTMLDivElement>(null);

  const clear = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("Kathmandu");
    setVehicleType("Hatchback");
    setVehicleModel("");
    setVehicleBrand("");
    setVehicleColor("");
    setTransmission("");
    setFuelType("Petrol");
    setFeatures([]);
    setFeaturesPickerOpen(false);
    setFinance("");
    setNotes("");
    setAgreedToLegal(false);
    setSubmitError(null);
    setSubmitSuccess(null);
    setModelError(null);
    setEmailError(null);
  }, []);

  useEffect(() => {
    if (!featuresPickerOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!featuresPickerRef.current?.contains(e.target as Node))
        setFeaturesPickerOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [featuresPickerOpen]);

  const addPresetFeature = useCallback((name: string) => {
    setFeatures((f) => (f.includes(name) ? f : [...f, name]));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (
      !fullName.trim() ||
      phone.length !== 10 ||
      !vehicleModel.trim() ||
      !vehicleBrand.trim() ||
      !vehicleColor ||
      !transmission ||
      !fuelType ||
      !finance
    ) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    if (!ALPHABET_ONLY.test(vehicleModel.trim())) {
      setModelError("Vehicle Model can only contain alphabets");
      setSubmitError("Vehicle Model can only contain alphabets.");
      return;
    }

    const emailErr = emailValidationError(email);
    if (emailErr) {
      setEmailError(emailErr);
      setSubmitError(emailErr);
      return;
    }

    if (!agreedToLegal) {
      setSubmitError(LEGAL_CONSENT_ERROR);
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
          city,
          vehicleType,
          vehicleModel: vehicleModel.trim(),
          vehicleBrand: vehicleBrand.trim(),
          vehicleColor,
          transmission,
          fuelType,
          features,
          finance,
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
        <label htmlFor={`${formId}-email`} className="text-[13px] text-black">
          Email
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          value={email}
          onChange={(e) => {
            const v = e.target.value;
            setEmail(v);
            setEmailError(emailValidationError(v));
          }}
          autoComplete="email"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? `${formId}-email-error` : undefined}
        />
        {emailError ? (
          <p id={`${formId}-email-error`} className="text-[12px] text-red-600">
            {emailError}
          </p>
        ) : null}
      </div>

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

      <PillSelect
        id={`${formId}-city`}
        label="City"
        required
        options={CITIES}
        value={city}
        onChange={setCity}
      />

      <PillSelect
        id={`${formId}-vtype`}
        label="Vehicle Type"
        required
        options={VEHICLE_TYPES}
        value={vehicleType}
        onChange={setVehicleType}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-model`} className="text-[13px] text-black">
          Vehicle Model<span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-model`}
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          placeholder="Santro"
          value={vehicleModel}
          onChange={(e) => {
            const cleaned = onlyAlpha(e.target.value);
            setVehicleModel(cleaned);
            setModelError(
              e.target.value === cleaned
                ? null
                : "Vehicle Model can only contain alphabets",
            );
          }}
        />
        {modelError ? (
          <p className="text-[12px] text-red-600">{modelError}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-brand`} className="text-[13px] text-black">
          Vehicle Brand<span className="text-red-600"> *</span>
        </label>
        <input
          id={`${formId}-brand`}
          className={textInputClass()}
          style={{ borderColor: BORDER }}
          placeholder="Hyundai"
          value={vehicleBrand}
          onChange={(e) => setVehicleBrand(e.target.value)}
        />
      </div>

      <PillSelect
        id={`${formId}-color`}
        label="Vehicle Color"
        required
        options={COLORS}
        value={vehicleColor}
        onChange={setVehicleColor}
      />

      <PillSelect
        id={`${formId}-gear`}
        label="Transmission / Gear"
        required
        options={TRANSMISSION}
        value={transmission}
        onChange={setTransmission}
      />

      <PillSelect
        id={`${formId}-fuel`}
        label="Fuel Type"
        required
        options={FUEL_TYPES_WITH_EV}
        value={fuelType}
        onChange={setFuelType}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] text-black">Features</span>
        <div ref={featuresPickerRef} className="relative">
          <div
            className="flex min-h-[42px] flex-wrap items-center gap-2 rounded-md border bg-white px-2 py-1.5"
            style={{ borderColor: BORDER }}
          >
            <button
              type="button"
              aria-expanded={featuresPickerOpen}
              aria-haspopup="listbox"
              aria-label="Choose features"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-zinc-200 text-lg leading-none text-zinc-600 hover:bg-zinc-50"
              onClick={() => setFeaturesPickerOpen((o) => !o)}
            >
              +
            </button>
            {features.map((f, i) => (
              <span
                key={`${f}-${i}`}
                className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[12px] font-medium"
                style={{ backgroundColor: TAG_BG, color: TAG_TEXT }}
              >
                {f}
                <button
                  type="button"
                  className="text-zinc-500 hover:text-zinc-800"
                  aria-label={`Remove ${f}`}
                  onClick={() =>
                    setFeatures((prev) => prev.filter((_, j) => j !== i))
                  }
                >
                  ×
                </button>
              </span>
            ))}
            {features.length === 0 ? (
              <span className="text-[14px] text-zinc-400">
                Tap + to add (Basic, A/C, 4WD, …)
              </span>
            ) : null}
          </div>
          {featuresPickerOpen ? (
            <ul
              role="listbox"
              aria-label="Feature presets"
              className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-md border bg-white py-1 shadow-sm"
              style={{ borderColor: BORDER }}
            >
              {FEATURE_PRESETS.filter((name) => !features.includes(name)).map(
                (name) => (
                  <li key={name} role="option">
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-[14px] text-zinc-800 hover:bg-zinc-50"
                      onClick={() => addPresetFeature(name)}
                    >
                      {name}
                    </button>
                  </li>
                ),
              )}
            </ul>
          ) : null}
        </div>
      </div>

      <PillSelect
        id={`${formId}-fin`}
        label="Are you looking for Finance?"
        required
        options={YES_NO}
        value={finance}
        onChange={setFinance}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-notes`} className="text-[13px] text-black">
          Notes
        </label>
        <textarea
          id={`${formId}-notes`}
          rows={5}
          className={textInputClass() + " resize-y min-h-[120px]"}
          style={{ borderColor: BORDER }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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

      <FormLegalConsent
        id={formId}
        checked={agreedToLegal}
        onCheckedChange={setAgreedToLegal}
      />

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
          disabled={submitting || !agreedToLegal}
          className="rounded-lg bg-zinc-900 px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}

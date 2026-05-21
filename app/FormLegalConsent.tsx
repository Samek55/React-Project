"use client";

import Link from "next/link";

export const LEGAL_CONSENT_ERROR =
  "You must agree to the Terms of Service, Privacy Policy, Refund Policy, and Disclaimer to continue.";

type FormLegalConsentProps = {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const linkClass =
  "underline decoration-zinc-400 underline-offset-2 hover:text-zinc-900";

export function FormLegalConsent({
  id,
  checked,
  onCheckedChange,
}: FormLegalConsentProps) {
  const checkboxId = `${id}-legal-consent`;

  return (
    <div className="flex items-start gap-2.5">
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900/10"
        required
      />
      <label htmlFor={checkboxId} className="text-[13px] leading-snug text-black">
        I agree to the{" "}
        <Link href="/terms" className={linkClass}>
          Terms of Service
        </Link>
        ,{" "}
        <Link href="/privacy" className={linkClass}>
          Privacy Policy
        </Link>
        ,{" "}
        <Link href="/refund" className={linkClass}>
          Refund Policy
        </Link>
        , and{" "}
        <Link href="/disclaimer" className={linkClass}>
          Disclaimer
        </Link>
      </label>
    </div>
  );
}

import type { Metadata } from "next";
import { HELPLINE_DISPLAY, HELPLINE_TEL } from "@/lib/site-content";
import { SiteShell } from "../SiteShell";

export const metadata: Metadata = {
  title: "Free Test Drive | Nepal Motor",
  description:
    "Book a free test drive for your next vehicle with NEPAL Motor.",
};

export default function TestDrivePage() {
  return (
    <SiteShell
      title="Free Test Drive"
      description="Schedule a test drive with our team — same service as in the NEPAL Motor app."
    >
      <p className="text-[15px] leading-relaxed text-slate-600">
        Tell us your preferred vehicle and branch; we will confirm a slot. Use
        the helpline below or submit a request through the app for the full
        multi-step form.
      </p>
      <a
        href={HELPLINE_TEL}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#075985] px-5 py-3 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
      >
        Call {HELPLINE_DISPLAY} to book
      </a>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { HELPLINE_DISPLAY, HELPLINE_TEL } from "@/lib/site-content";
import { SiteShell } from "../SiteShell";

export const metadata: Metadata = {
  title: "Buy Used Car | Nepal Motor",
  description:
    "Browse and buy quality used cars with branch-backed support from NEPAL Motor.",
};

export default function BuyUsedCarPage() {
  return (
    <SiteShell title="Buy Used Car" description="Find your next vehicle with verified listings and branch support.">
      <p className="text-[15px] leading-relaxed text-slate-600">
        For inventory, pricing, and purchase support, contact our helpline or
        visit a branch. The mobile app lists current opportunities; on the web
        you can reach us directly.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={HELPLINE_TEL}
          className="inline-flex items-center justify-center rounded-xl bg-[#075985] px-5 py-3 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
        >
          Call {HELPLINE_DISPLAY}
        </a>
        <Link
          href="/dealers"
          className="inline-flex items-center justify-center rounded-xl border-2 border-slate-700 px-5 py-3 text-[15px] font-bold text-slate-800 transition-colors hover:bg-slate-50"
        >
          Dealer branches
        </Link>
      </div>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { BuyUsedCarsForm } from "../BuyUsedCarsForm";
import { SiteShell } from "../SiteShell";

export const metadata: Metadata = {
  title: "Buy Used Car | Nepal Motor",
  description:
    "Browse and buy quality used cars with branch-backed support from NEPAL Motor.",
};

export default function BuyUsedCarPage() {
  return (
    <SiteShell
      title="Buy Used Car"
      description="Tell us what you want, and we'll match you with inspected used cars."
      variant="form"
    >
      <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
        <BuyUsedCarsForm />
      </div>
    </SiteShell>
  );
}

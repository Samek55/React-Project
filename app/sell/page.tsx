import type { Metadata } from "next";
import { ExchangeToEvForm } from "../ExchangeToEvForm";
import { SiteShell } from "../SiteShell";

export const metadata: Metadata = {
  title: "Sell Used Car | Nepal Motor",
  description:
    "Sell your used car with NEPAL Motor — fair valuation, inspection, and hassle-free paperwork.",
};

export default function SellPage() {
  return (
    <SiteShell
      title="Sell Used Car"
      description="Get a fair market valuation and sell your vehicle with professional support."
      activeNav="sell"
      variant="form"
    >
      <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
        <ExchangeToEvForm variant="sell" />
      </div>
    </SiteShell>
  );
}

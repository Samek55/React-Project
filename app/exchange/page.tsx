import type { Metadata } from "next";
import { ExchangeToEvForm } from "../ExchangeToEvForm";
import { SiteShell } from "../SiteShell";

export const metadata: Metadata = {
  title: "Exchange to EV | Nepal Motor",
  description:
    "Exchange your petrol or diesel vehicle for an electric vehicle with NEPAL Motor.",
};

export default function ExchangePage() {
  return (
    <SiteShell
      title="Exchange to EV"
      activeNav="exchange"
      variant="form"
    >
      <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
        <ExchangeToEvForm />
      </div>
    </SiteShell>
  );
}

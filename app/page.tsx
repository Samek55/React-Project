import { ExchangeToEvForm } from "./ExchangeToEvForm";
import { SiteShell } from "./SiteShell";

export default function Home() {
  return (
    <SiteShell
      title="Exchange to EV"
      description="Trade your petrol or diesel vehicle toward a modern electric vehicle."
      activeNav="exchange"
      variant="form"
    >
      <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
        <ExchangeToEvForm />
      </div>
    </SiteShell>
  );
}

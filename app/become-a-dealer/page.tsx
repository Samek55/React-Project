import type { Metadata } from "next";
import { BecomeADealerForm } from "../BecomeADealerForm";
import { SiteShell } from "../SiteShell";

export const metadata: Metadata = {
  title: "Become a Dealer | Nepal Motor",
  description:
    "Apply to become a NEPAL Motor partner dealer. Share your showroom details and our team will reach out.",
};

export default function BecomeADealerPage() {
  return (
    <SiteShell
      title="Become a Dealer"
      variant="form"
    >
      <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
        <BecomeADealerForm />
      </div>
    </SiteShell>
  );
}

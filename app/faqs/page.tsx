import type { Metadata } from "next";
import { FaqAccordion } from "../FaqAccordion";
import { SiteShell } from "../SiteShell";

export const metadata: Metadata = {
  title: "FAQs | Nepal Motor",
  description:
    "Frequently asked questions about car exchange, selling, buying, and NEPAL Motor services.",
};

export default function FaqsPage() {
  return (
    <SiteShell
      title="Frequently Asked Questions"
      description="Answers about exchange, selling, buying, and our services."
      activeNav="faqs"
    >
      <FaqAccordion />
    </SiteShell>
  );
}

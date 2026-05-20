import type { Metadata } from "next";
import { SiteShell } from "../SiteShell";
import { GlossaryClient } from "./GlossaryClient";

export const metadata: Metadata = {
  title: "Glossary | Nepal Motor",
  description:
    "Used car, EV exchange, and auto market terms from A to Z — same glossary as the NEPAL Motor app.",
};

export default function GlossaryPage() {
  return (
    <SiteShell
      title="Glossary"
      description="Definitions for common automotive and marketplace terms."
      variant="wide"
    >
      <GlossaryClient />
    </SiteShell>
  );
}

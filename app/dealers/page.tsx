import type { Metadata } from "next";
import { SiteShell } from "../SiteShell";
import { branches } from "@/lib/site-content";
import { DealersClient } from "./DealersClient";

export const metadata: Metadata = {
  title: "Dealers | Nepal Motor",
  description:
    "Find NEPAL Motor dealer locations and contacts across Nepal.",
};

export default function DealersPage() {
  return (
    <SiteShell title="Dealers" activeNav="dealers" variant="dealers">
      <DealersClient branches={branches} />
    </SiteShell>
  );
}

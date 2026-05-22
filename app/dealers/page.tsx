import type { Metadata } from "next";
import { SiteShell } from "../SiteShell";
import { fetchActiveDealers } from "@/lib/fetch-dealers";
import { DealersClient } from "./DealersClient";

export const metadata: Metadata = {
  title: "Dealers | Nepal Motor",
  description:
    "Find NEPAL Motor dealer locations and contacts across Nepal.",
};

export const revalidate = 60;

export default async function DealersPage() {
  const branches = await fetchActiveDealers();

  return (
    <SiteShell title="Dealers" activeNav="dealers" variant="dealers">
      <DealersClient branches={branches} />
    </SiteShell>
  );
}

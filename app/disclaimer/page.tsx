import type { Metadata } from "next";
import { LegalDocumentView } from "../LegalDocumentView";
import { disclaimer } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Disclaimer | Nepal Motor",
  description: disclaimer.description,
};

export default function DisclaimerPage() {
  return <LegalDocumentView document={disclaimer} />;
}

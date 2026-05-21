import type { Metadata } from "next";
import { LegalDocumentView } from "../LegalDocumentView";
import { termsOfService } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service | Nepal Motor",
  description: termsOfService.description,
};

export default function TermsPage() {
  return <LegalDocumentView document={termsOfService} />;
}

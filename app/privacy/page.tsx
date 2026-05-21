import type { Metadata } from "next";
import { LegalDocumentView } from "../LegalDocumentView";
import { privacyPolicy } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Nepal Motor",
  description: privacyPolicy.description,
};

export default function PrivacyPage() {
  return <LegalDocumentView document={privacyPolicy} />;
}

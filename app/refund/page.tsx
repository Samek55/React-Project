import type { Metadata } from "next";
import { LegalDocumentView } from "../LegalDocumentView";
import { refundPolicy } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Refund Policy | Nepal Motor",
  description: refundPolicy.description,
};

export default function RefundPage() {
  return <LegalDocumentView document={refundPolicy} />;
}

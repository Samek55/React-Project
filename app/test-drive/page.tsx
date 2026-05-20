import type { Metadata } from "next";
import { SiteShell } from "../SiteShell";
import { TestDriveForm } from "../TestDriveForm";

export const metadata: Metadata = {
  title: "Free Test Drive | Nepal Motor",
  description:
    "Book a free test drive for your next vehicle with NEPAL Motor.",
};

export default function TestDrivePage() {
  return (
    <SiteShell
      title="Free Test Drive"
      description="Fill out the form below to request a test drive. We will confirm your slot after we receive your details."
      variant="form"
    >
      <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
        <TestDriveForm />
      </div>
    </SiteShell>
  );
}

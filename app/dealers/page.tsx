import type { Metadata } from "next";
import { SiteShell } from "../SiteShell";
import { branches } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Dealers | Nepal Motor",
  description:
    "Find NEPAL Motor dealer locations and contacts across Nepal.",
};

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5 text-zinc-700"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10z"
      />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

export default function DealersPage() {
  return (
    <SiteShell
      title="Dealers"
      description="Visit a partner location for inspection, valuation, and consultation."
      activeNav="dealers"
      variant="wide"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch) => (
          <div
            key={branch.phone}
            className="flex flex-col rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
              <LocationIcon />
            </div>
            <h2 className="text-[15px] font-semibold text-zinc-900">
              {branch.name}
            </h2>
            <p className="mt-1 text-[14px] text-zinc-500">{branch.location}</p>
            <p className="mt-3 text-[13px] text-zinc-400">Contact</p>
            <p className="text-[14px] font-medium text-zinc-700">
              {branch.contact}
            </p>
            <a
              href={`tel:${branch.phone}`}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800"
            >
              <PhoneIcon />
              {branch.phone}
            </a>
          </div>
        ))}
      </div>
    </SiteShell>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  );
}

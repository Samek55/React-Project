import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../SiteShell";
import { aboutParagraphs } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About | Nepal Motor",
  description:
    "Learn about NEPAL Motor — trusted used car exchange, buy, and sell services in Nepal.",
};

const sections = [
  { label: "Who we are", text: aboutParagraphs[0] },
  { label: "What we offer", text: aboutParagraphs[1] },
  { label: "Our commitment", text: aboutParagraphs[2] },
] as const;

export default function AboutPage() {
  return (
    <SiteShell title="About NEPAL Motor" activeNav="about" variant="form">
      <div className="max-w-2xl">
        <p className="text-[15px] leading-relaxed text-zinc-500 sm:text-base">
          Trusted vehicle exchange, buying, and selling across Nepal.
        </p>

        <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
          {sections.map((section, index) => (
            <section
              key={section.label}
              className={index > 0 ? "border-t border-zinc-200/70 pt-10 sm:pt-12" : ""}
            >
              <h2 className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                {section.label}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-zinc-700 sm:mt-4 sm:text-base sm:leading-[1.8]">
                {section.text}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-zinc-200/70 pt-10 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-12">
          <p className="text-[14px] text-zinc-500">
            Ready to get started?
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Exchange to EV
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-4 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Sell your car
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

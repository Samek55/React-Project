"use client";

import { useState } from "react";
import { flatFaqs } from "@/lib/site-content";

export function FaqAccordion() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2">
      {flatFaqs.map((item, index) => {
        const expanded = openFaqIndex === index;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm"
          >
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpenFaqIndex(expanded ? null : index)}
              className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-zinc-50/80 sm:px-5"
            >
              <span className="text-[14px] font-medium leading-snug text-zinc-900 sm:text-[15px]">
                <span className="mr-2 text-zinc-400">{index + 1}.</span>
                {item.question}
              </span>
              <ChevronIcon expanded={expanded} />
            </button>
            {expanded ? (
              <div className="border-t border-zinc-100 px-4 pb-4 pt-3 sm:px-5">
                <p className="text-[14px] leading-relaxed text-zinc-600">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`mt-0.5 shrink-0 text-zinc-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

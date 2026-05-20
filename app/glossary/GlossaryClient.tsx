"use client";

import { useMemo, useState } from "react";
import { glossaryData, type GlossaryLetter } from "@/lib/glossary-data";

const letterRows: GlossaryLetter[][] = [
  ["A", "B", "C", "D", "E", "F"],
  ["G", "H", "I", "J", "K", "L"],
  ["M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X"],
  ["Y", "Z"],
];

export function GlossaryClient() {
  const [activeLetter, setActiveLetter] = useState<GlossaryLetter>("A");

  const terms = useMemo(
    () => glossaryData[activeLetter] ?? [],
    [activeLetter],
  );

  return (
    <div className="pt-2">
      <p className="mb-6 px-2 text-center text-[17px] leading-[26px] text-slate-600">
        Explore common used car, EV exchange, and auto market terms from A to
        Z.
      </p>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        {letterRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="mb-2 flex flex-row justify-center gap-2 last:mb-0"
          >
            {row.map((letter) => {
              const active = activeLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setActiveLetter(letter)}
                  className={
                    active
                      ? "flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#075985] text-[15px] font-bold text-white"
                      : "flex h-11 w-11 items-center justify-center rounded-[10px] bg-slate-100 text-[15px] font-bold text-slate-600 transition-colors hover:bg-slate-200"
                  }
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <p className="mb-4 text-center text-[32px] font-black text-[#075985]">
        {activeLetter}
      </p>

      <div className="space-y-3">
        {terms.map((term, i) => (
          <div
            key={`${term.title}-${i}`}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_6px_rgba(7,89,133,0.07)]"
          >
            <h2 className="mb-1.5 text-base font-extrabold text-sky-900">
              {term.title}
            </h2>
            <p className="text-[14px] leading-[22px] text-slate-600">
              {term.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

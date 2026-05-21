"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Branch } from "@/lib/site-content";

function dealerCities(branches: Branch[]): string[] {
  const cities = [...new Set(branches.map((b) => b.location))];
  cities.sort((a, b) => a.localeCompare(b));
  const ktm = cities.indexOf("Kathmandu");
  if (ktm > 0) {
    cities.splice(ktm, 1);
    cities.unshift("Kathmandu");
  }
  return cities;
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
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

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-[22px] w-[22px] text-[#075985]"
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

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
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

type DealersClientProps = {
  branches: Branch[];
};

export function DealersClient({ branches }: DealersClientProps) {
  const filterId = useId();
  const cities = useMemo(() => dealerCities(branches), [branches]);
  const [city, setCity] = useState(() => cities[0] ?? "");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => branches.filter((b) => b.location === city),
    [branches, city],
  );

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="space-y-5 pb-2">
      <div className="flex flex-col gap-2">
        <label
          htmlFor={filterId}
          className="text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-400"
        >
          Filter by city
        </label>
        <div ref={rootRef} className="relative">
          <button
            id={filterId}
            type="button"
            aria-expanded={open}
            aria-haspopup="listbox"
            onClick={() => setOpen((o) => !o)}
            className="flex w-full min-h-[48px] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-[15px] font-normal text-[#020617] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-800/20"
          >
            <span>{city || "Select city"}</span>
            <ChevronDown className="shrink-0 text-slate-500" />
          </button>
          {open ? (
            <ul
              role="listbox"
              aria-label="City"
              className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            >
              {cities.map((opt) => (
                <li key={opt} role="option" aria-selected={city === opt}>
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 text-left text-[15px] text-slate-800 hover:bg-sky-50"
                    onClick={() => {
                      setCity(opt);
                      setOpen(false);
                    }}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-[14px] text-slate-500">
            No dealers found in {city}.
          </p>
        ) : (
          filtered.map((branch) => (
            <article
              key={branch.phone}
              className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-50">
                <LocationIcon />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] font-bold leading-tight text-[#020617]">
                  {branch.name}
                </h2>
                <p className="mt-0.5 text-[14px] font-medium text-[#0369a1]">
                  {branch.location}
                </p>
                <p className="mt-2.5 text-[14px] text-slate-500">
                  {branch.contact}
                </p>
                <a
                  href={`tel:${branch.phone}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-sky-100 px-3.5 py-2 text-[14px] font-semibold text-[#0369a1] transition-colors hover:bg-sky-200"
                >
                  <PhoneIcon />
                  {branch.phone}
                </a>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HelplineIcon } from "./HelplineIcon";
import { CALL_URL } from "./SiteShell";

const HELPLINE_LABEL = "Call +977 9800000000";

export function SiteNav() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <header className="mb-8 bg-white px-3 pt-1 sm:px-4">
      <div
        className="mx-auto flex min-h-[70px] w-full max-w-[564px] items-center justify-between gap-2 rounded-lg bg-white px-2 shadow-[0_5px_12px_rgba(0,0,0,0.1)]"
      >
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 pr-1 transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.jpeg"
            alt="NEPAL Motor"
            width={50}
            height={50}
            className="h-[50px] w-[50px] shrink-0 rounded-full border border-gray-200 object-cover"
            priority
          />
          <span className="truncate text-[22px] font-extrabold leading-tight text-slate-950 sm:text-[25px]">
            NEPAL Motor
          </span>
        </Link>

        <div className="relative shrink-0">
          <a
            href={CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full transition-colors hover:bg-[#f2f2f2]"
            aria-label="Call NEPAL Motor"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            <HelplineIcon size={26} />
          </a>
          {showTooltip ? (
            <span
              role="tooltip"
              className="pointer-events-none absolute right-0 top-[50px] z-50 min-w-[174px] rounded-md bg-gray-900 px-2.5 py-2 text-center text-[13px] font-medium text-white shadow-[0_3px_8px_rgba(0,0,0,0.18)]"
            >
              {HELPLINE_LABEL}
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}

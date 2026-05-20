"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CALL_URL, type NavKey } from "./SiteShell";

const navItems: { key: NavKey; label: string; href: string }[] = [
  { key: "exchange", label: "Exchange", href: "/" },
  { key: "sell", label: "Sell", href: "/sell" },
  { key: "faqs", label: "FAQs", href: "/faqs" },
  { key: "dealers", label: "Dealers", href: "/dealers" },
  { key: "about", label: "About", href: "/about" },
];

function navLinkClass(active: boolean) {
  return active
    ? "rounded-full bg-zinc-900 px-3.5 py-1.5 text-[13px] font-medium text-white"
    : "rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900";
}

type SiteNavProps = {
  activeNav?: NavKey;
};

export function SiteNav({ activeNav }: SiteNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (key: NavKey, href: string) => {
    if (activeNav) return activeNav === key;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.jpeg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-zinc-200/80"
            priority
          />
          <span className="truncate text-[15px] font-semibold tracking-tight text-zinc-900 sm:text-base">
            NEPAL Motor
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={navLinkClass(isActive(item.key, item.href))}
              aria-current={isActive(item.key, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 sm:inline-flex"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            Call
          </a>
          <a
            href={CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-50 sm:hidden"
            aria-label="Call NEPAL Motor"
          >
            <PhoneIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-50 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-zinc-100 bg-white px-4 py-3 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={
                  isActive(item.key, item.href)
                    ? "rounded-lg bg-zinc-900 px-3 py-2.5 text-[15px] font-medium text-white"
                    : "rounded-lg px-3 py-2.5 text-[15px] font-medium text-zinc-600 hover:bg-zinc-50"
                }
                aria-current={
                  isActive(item.key, item.href) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

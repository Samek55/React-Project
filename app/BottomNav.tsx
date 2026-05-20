"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "./NavIcons";
import type { NavKey } from "./SiteShell";

const bottomNavItems: {
  key: NavKey;
  label: string;
  href: string;
  icon: "exchange" | "faqs" | "sell" | "about" | "dealers";
}[] = [
  { key: "exchange", label: "Exchange", href: "/", icon: "exchange" },
  { key: "faqs", label: "FAQs", href: "/faqs", icon: "faqs" },
  { key: "sell", label: "Sell", href: "/sell", icon: "sell" },
  { key: "about", label: "About", href: "/about", icon: "about" },
  { key: "dealers", label: "Dealers", href: "/dealers", icon: "dealers" },
];

type BottomNavProps = {
  activeNav?: NavKey;
};

export function BottomNav({ activeNav }: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (key: NavKey, href: string) => {
    if (activeNav) return activeNav === key;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:px-4"
      aria-hidden={false}
    >
      <nav
        className="pointer-events-auto flex w-full max-w-lg items-stretch justify-between rounded-2xl border border-slate-200 bg-white px-1 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        aria-label="Bottom navigation"
      >
        {bottomNavItems.map((item) => {
          const active = isActive(item.key, item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={
                active
                  ? "flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-sky-50 px-0.5 py-1.5 text-sky-800"
                  : "flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-1.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
              }
              aria-current={active ? "page" : undefined}
            >
              <NavIcon name={item.icon} />
              <span className="max-w-full truncate text-center text-[9px] font-bold leading-tight tracking-tight sm:text-[10px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

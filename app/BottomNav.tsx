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
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom,0px)]"
      aria-hidden={false}
    >
      <div className="mx-auto flex w-full max-w-[564px] justify-center px-[10px] pt-1.5 pb-2 max-[400px]:px-1.5 sm:px-3">
        <nav
          className="flex w-full min-h-16 items-stretch justify-between rounded-[18px] border border-slate-200 bg-white px-1.5 py-1.5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
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
                    ? "flex min-h-[50px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-sky-100 px-0.5 py-1 text-[#075985]"
                    : "flex min-h-[50px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-1 text-[#64748b] transition-colors hover:bg-slate-50"
                }
                aria-current={active ? "page" : undefined}
              >
                <NavIcon name={item.icon} />
                <span className="max-w-full truncate text-center text-[8.5px] font-extrabold leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

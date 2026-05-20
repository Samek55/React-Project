"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HELPLINE_TEL } from "@/lib/site-content";
import {
  DrawerIconBook,
  DrawerIconBusiness,
  DrawerIconCallOutline,
  DrawerIconCarSport,
  DrawerIconClose,
  DrawerIconHelpCircle,
  DrawerIconHome,
  DrawerIconInformationCircle,
  DrawerIconKey,
} from "./DrawerIcons";
import { NavIcon } from "./NavIcons";

type NavKey =
  | "exchange"
  | "sell"
  | "buy"
  | "about"
  | "testdrive"
  | "dealer"
  | "faqs"
  | "glossary";

type DrawerMode =
  | "home"
  | "exchangeSvg"
  | "sellSvg"
  | "key"
  | "callTel"
  | "info"
  | "carSport"
  | "business"
  | "help"
  | "book";

type DrawerItemConfig = {
  label: string;
  mode: DrawerMode;
  href?: string;
  navKey?: NavKey;
};

const primaryItems: DrawerItemConfig[] = [
  { label: "Home", href: "/", navKey: "exchange", mode: "home" },
  { label: "Exchange to EV", href: "/", navKey: "exchange", mode: "exchangeSvg" },
  { label: "Sell Used Car", href: "/sell", navKey: "sell", mode: "sellSvg" },
  { label: "Buy Used Car", href: "/buy", navKey: "buy", mode: "key" },
  { label: "Contact", mode: "callTel" },
];

const secondaryItems: DrawerItemConfig[] = [
  { label: "About Us", href: "/about", navKey: "about", mode: "info" },
  {
    label: "Free Test Drive",
    href: "/test-drive",
    navKey: "testdrive",
    mode: "carSport",
  },
  {
    label: "Become a Dealer",
    href: "/dealers",
    navKey: "dealer",
    mode: "business",
  },
  { label: "FAQs", href: "/faqs", navKey: "faqs", mode: "help" },
  { label: "Glossary", href: "/glossary", navKey: "glossary", mode: "book" },
];

function activeNavKeyFromPath(pathname: string): NavKey | null {
  if (pathname === "/") return "exchange";
  if (pathname.startsWith("/sell")) return "sell";
  if (pathname.startsWith("/buy")) return "buy";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/test-drive")) return "testdrive";
  if (pathname.startsWith("/dealers")) return "dealer";
  if (pathname.startsWith("/faqs")) return "faqs";
  if (pathname.startsWith("/glossary")) return "glossary";
  return null;
}

export function SiteNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeNavKey = useMemo(
    () => activeNavKeyFromPath(pathname),
    [pathname],
  );

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white px-[18px] pb-3 pt-[max(8px,env(safe-area-inset-top,0px))]">
        <div className="mx-auto flex w-full max-w-[564px] min-h-16 items-center justify-between gap-[7px] rounded-[18px] border border-slate-200 bg-white px-[7px] py-1.5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2 pr-1 transition-opacity hover:opacity-90"
            onClick={closeDrawer}
          >
            <Image
              src="/logo.jpeg"
              alt="NEPAL Motor"
              width={50}
              height={50}
              className="h-[50px] w-[50px] shrink-0 rounded-full border border-gray-200 object-cover"
              priority
            />
            <span className="truncate text-[25px] font-extrabold leading-tight text-[#020617]">
              NEPAL Motor
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-0.5">
            <a
              href={HELPLINE_TEL}
              className="flex items-center justify-center rounded-lg p-[7px] text-[#0f172a] transition-colors hover:bg-slate-100"
              aria-label="Call NEPAL Motor"
            >
              <IconCallOutline className="h-6 w-6" />
            </a>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg p-[7px] text-[#0f172a] transition-colors hover:bg-slate-100"
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <IconMenu className="h-[26px] w-[26px]" />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen ? (
        <div
          className="fixed inset-0 z-[100] flex flex-row items-start pl-4 pt-0"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(15,23,42,0.48)]"
            aria-label="Close menu"
            onClick={closeDrawer}
          />
          <div
            className="relative z-[101] flex w-[min(340px,82vw)] flex-col overflow-hidden rounded-[20px] bg-[#f1f5f9] shadow-[0_4px_24px_rgba(0,0,0,0.28)]"
            style={{
              marginTop: "max(32px, calc(env(safe-area-inset-top, 0px) + 8px))",
              height: "70vh",
            }}
          >
            <div className="flex flex-row items-center gap-2.5 px-3.5 pb-2.5 pt-3">
              <Image
                src="/logo.jpeg"
                alt=""
                width={42}
                height={42}
                className="h-[42px] w-[42px] shrink-0 rounded-full border border-slate-200 object-cover"
              />
              <span className="min-w-0 flex-1 truncate text-[17px] font-black text-[#075985]">
                NEPAL Motor
              </span>
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-slate-200"
                aria-label="Close menu"
                onClick={closeDrawer}
              >
                <DrawerIconClose />
              </button>
            </div>

            <div className="mx-3.5 my-0.5 h-px bg-slate-200" />

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
              <div className="flex flex-1 flex-col justify-center gap-0.5 px-2 py-1">
                {primaryItems.map((item, i) => {
                  const active = Boolean(
                    item.navKey &&
                      activeNavKey === item.navKey &&
                      item.label !== "Home",
                  );
                  return (
                    <DrawerRow
                      key={`p-${i}`}
                      item={item}
                      active={active}
                      onNavigate={closeDrawer}
                    />
                  );
                })}
              </div>

              <div className="mx-3.5 my-1 h-px bg-slate-300" />

              <div className="flex flex-1 flex-col justify-center gap-0.5 px-2 py-1">
                {secondaryItems.map((item, i) => {
                  const active = Boolean(
                    item.navKey && activeNavKey === item.navKey,
                  );
                  return (
                    <DrawerRow
                      key={`s-${i}`}
                      item={item}
                      active={active}
                      onNavigate={closeDrawer}
                    />
                  );
                })}
              </div>

              <div className="shrink-0 px-3.5 pb-3.5 pt-1.5">
                <button
                  type="button"
                  className="min-h-[52px] rounded-xl border-[1.5px] border-slate-700 px-8 text-base font-bold text-slate-700 transition-colors hover:bg-slate-200"
                  onClick={closeDrawer}
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function DrawerRow({
  item,
  active,
  onNavigate,
}: {
  item: DrawerItemConfig;
  active: boolean;
  onNavigate: () => void;
}) {
  const iconColor = active ? "#075985" : "#475569";
  const rowClass = active
    ? "flex flex-row items-center gap-3 rounded-[10px] bg-[#dbeafe] px-3 py-[7px]"
    : "flex flex-row items-center gap-3 rounded-[10px] px-3 py-[7px] transition-colors hover:bg-[#e2e8f0]";
  const textClass = active
    ? "flex-1 text-[15px] font-extrabold text-[#075985]"
    : "flex-1 text-[15px] font-semibold text-[#334155]";

  const icon = renderDrawerIcon(item.mode, iconColor);

  const inner = (
    <>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className={textClass}>{item.label}</span>
    </>
  );

  if (item.mode === "callTel") {
    return (
      <a href={HELPLINE_TEL} className={rowClass} onClick={onNavigate}>
        {inner}
      </a>
    );
  }

  if (item.href) {
    return (
      <Link href={item.href} className={rowClass} onClick={onNavigate}>
        {inner}
      </Link>
    );
  }

  return null;
}

function renderDrawerIcon(mode: DrawerMode, color: string) {
  switch (mode) {
    case "home":
      return <DrawerIconHome color={color} />;
    case "exchangeSvg":
      return <NavIcon name="exchange" className="h-5 w-5" style={{ color }} />;
    case "sellSvg":
      return <NavIcon name="sell" className="h-5 w-5" style={{ color }} />;
    case "key":
      return <DrawerIconKey color={color} />;
    case "callTel":
      return <DrawerIconCallOutline color={color} />;
    case "info":
      return <DrawerIconInformationCircle color={color} />;
    case "carSport":
      return <DrawerIconCarSport color={color} />;
    case "business":
      return <DrawerIconBusiness color={color} />;
    case "help":
      return <DrawerIconHelpCircle color={color} />;
    case "book":
      return <DrawerIconBook color={color} />;
    default:
      return null;
  }
}

function IconCallOutline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0f172a"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

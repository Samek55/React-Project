import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { SiteNav } from "./SiteNav";

export const CALL_URL = "https://b.broadpress.org/nepalmotorcall";

export type NavKey = "exchange" | "faqs" | "sell" | "about" | "dealers";

type SiteShellProps = {
  title: string;
  description?: string;
  activeNav?: NavKey;
  /** Narrower column for long forms */
  variant?: "default" | "form" | "wide";
  /** Full-viewport layout without page title (e.g. app download) */
  compact?: boolean;
  children: ReactNode;
};

export function SiteShell({
  title,
  description,
  activeNav,
  variant = "default",
  compact = false,
  children,
}: SiteShellProps) {
  const contentWidth =
    variant === "form"
      ? "max-w-xl"
      : variant === "wide"
        ? "max-w-6xl"
        : "max-w-3xl lg:max-w-4xl";

  return (
    <div
      className={
        compact
          ? "flex h-dvh max-h-dvh flex-col overflow-hidden bg-white"
          : "flex min-h-screen flex-col bg-white"
      }
    >
      <main
        className={
          compact
            ? "flex min-h-0 flex-1 flex-col overflow-hidden pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))]"
            : "flex-1 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))]"
        }
      >
        <SiteNav />
        <div
          className={
            compact
              ? "flex min-h-0 flex-1 flex-col overflow-hidden px-3"
              : `mx-auto w-full px-4 sm:px-6 lg:px-8 ${contentWidth}`
          }
        >
          {!compact ? (
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                {title}
              </h1>
              {description ? (
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-zinc-500">
                  {description}
                </p>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>
      </main>
      <footer className="hidden border-t border-zinc-200/80 bg-white py-6 md:block">
        <div className="mx-auto max-w-6xl px-4 text-center text-[12px] text-zinc-400 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} NEPAL Motor. Nepal&apos;s trusted car
          trading portal.
        </div>
      </footer>
      <BottomNav activeNav={activeNav} />
    </div>
  );
}

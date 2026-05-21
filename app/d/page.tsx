import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "../SiteShell";

export const metadata: Metadata = {
  title: "Download App | Nepal Motor",
  description:
    "Buy, sell, and exchange used cars across Nepal with the NEPAL Motor app.",
};

const PLAY_STORE_URL = "#";
const APP_STORE_URL = "#";

const stats = [
  { value: "500+", label: "Cars Sold" },
  { value: "Whole Nepal", label: "Coverage" },
] as const;

export default function DownloadAppPage() {
  return (
    <SiteShell title="Download App" variant="wide">
      <section className="overflow-hidden rounded-[20px] border border-sky-200 bg-sky-50 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="text-center lg:text-left">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-sky-700">
              NEPAL Motor
            </p>
            <h1 className="mt-3 text-[28px] font-black leading-[1.15] text-sky-950 sm:text-[34px] lg:text-[40px]">
              Get the NEPAL Motor App
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
              Buy, sell, and exchange used cars across Nepal — right from your
              phone.
            </p>

            <div className="mt-6 flex flex-wrap items-stretch justify-center gap-3 lg:justify-start">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex min-w-[140px] flex-1 flex-col items-center rounded-[14px] border border-slate-200 bg-white py-3.5 px-3 shadow-[0_2px_6px_rgba(7,89,133,0.07)] lg:flex-none"
                >
                  <span className="text-[20px] font-black text-sky-800 sm:text-[22px]">
                    {s.value}
                  </span>
                  <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="flex w-full max-w-[220px] items-center justify-center gap-3 rounded-[14px] bg-slate-900 px-5 py-3.5 text-white shadow-[0_4px_10px_rgba(7,89,133,0.3)] transition-colors hover:bg-black sm:w-auto"
              >
                <PlayStoreIcon className="h-7 w-7" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-medium uppercase tracking-wide text-white/80">
                    GET IT ON
                  </span>
                  <span className="text-[16px] font-extrabold">
                    Google Play
                  </span>
                </span>
              </a>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="flex w-full max-w-[220px] items-center justify-center gap-3 rounded-[14px] bg-slate-900 px-5 py-3.5 text-white shadow-[0_4px_10px_rgba(7,89,133,0.3)] transition-colors hover:bg-black sm:w-auto"
              >
                <AppStoreIcon className="h-7 w-7" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-medium uppercase tracking-wide text-white/80">
                    Download on the
                  </span>
                  <span className="text-[16px] font-extrabold">App Store</span>
                </span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <Image
              src="/app-download/phone-preview.png"
              alt="NEPAL Motor app preview"
              width={360}
              height={780}
              priority
              className="h-auto w-[240px] drop-shadow-[0_30px_40px_rgba(7,89,133,0.18)] sm:w-[280px] lg:w-[320px]"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.6 1.86a1.5 1.5 0 0 0-.6 1.2v17.88c0 .48.21.93.57 1.2L13.2 12 3.6 1.86z"
        fill="#34A853"
      />
      <path d="M16.7 8.55 13.2 12l3.5 3.45 4.65-2.62a1.5 1.5 0 0 0 0-2.65l-4.65-2.63z" fill="#FBBC04" />
      <path
        d="M3 21.21c.3.23.71.27 1.07.07L16.7 15.45 13.2 12 3 21.21z"
        fill="#EA4335"
      />
      <path d="M4.07 1.78c-.36-.2-.77-.16-1.07.08L13.2 12l3.5-3.45L4.07 1.78z" fill="#4285F4" />
    </svg>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.564 12.602c-.022-2.314 1.89-3.422 1.977-3.477-1.077-1.575-2.755-1.79-3.355-1.815-1.428-.144-2.787.84-3.514.84-.728 0-1.842-.82-3.03-.797-1.56.024-3.001.906-3.804 2.297-1.622 2.812-.414 6.972 1.165 9.255.772 1.116 1.69 2.37 2.893 2.325 1.165-.046 1.605-.753 3.013-.753 1.407 0 1.803.753 3.03.728 1.252-.023 2.043-1.137 2.81-2.258.886-1.296 1.252-2.553 1.273-2.618-.028-.012-2.443-.937-2.458-3.727zM15.27 5.81c.643-.78 1.077-1.864.957-2.946-.926.038-2.05.617-2.717 1.397-.598.69-1.121 1.793-.98 2.853 1.034.08 2.097-.524 2.74-1.304z" />
    </svg>
  );
}

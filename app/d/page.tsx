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

const storeButtonClass =
  "flex w-[148px] items-center justify-center gap-2 rounded-[10px] bg-slate-900 px-3 py-2 text-white shadow-[0_3px_8px_rgba(7,89,133,0.25)] transition-colors hover:bg-black";

export default function DownloadAppPage() {
  return (
    <SiteShell title="Download App" compact>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-between gap-2 overflow-hidden py-1">
        <div className="relative min-h-0 w-full max-w-[min(78vw,260px)] flex-1">
          <Image
            src="/app-download/phone-preview.png"
            alt="NEPAL Motor app on mobile"
            fill
            priority
            sizes="(max-width: 640px) 78vw, 260px"
            className="object-contain object-center"
          />
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 pb-0.5">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className={storeButtonClass}
          >
            <PlayStoreIcon className="h-5 w-5 shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[8px] font-medium uppercase tracking-wide text-white/80">
                GET IT ON
              </span>
              <span className="text-[13px] font-extrabold">Google Play</span>
            </span>
          </a>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className={storeButtonClass}
          >
            <AppStoreIcon className="h-5 w-5 shrink-0" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[8px] font-medium uppercase tracking-wide text-white/80">
                Download on the
              </span>
              <span className="text-[13px] font-extrabold">App Store</span>
            </span>
          </a>
        </div>
      </div>
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
      <path
        d="M16.7 8.55 13.2 12l3.5 3.45 4.65-2.62a1.5 1.5 0 0 0 0-2.65l-4.65-2.63z"
        fill="#FBBC04"
      />
      <path
        d="M3 21.21c.3.23.71.27 1.07.07L16.7 15.45 13.2 12 3 21.21z"
        fill="#EA4335"
      />
      <path
        d="M4.07 1.78c-.36-.2-.77-.16-1.07.08L13.2 12l3.5-3.45L4.07 1.78z"
        fill="#4285F4"
      />
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

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
  "flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-white shadow-[0_4px_14px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/90 transition-[transform,box-shadow] hover:scale-[1.04] hover:shadow-[0_8px_20px_rgba(15,23,42,0.12)] active:scale-[0.98]";

export default function DownloadAppPage() {
  return (
    <SiteShell title="Download App" compact>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 bg-white px-2 pb-2">
        <div className="relative w-full max-w-[min(96vw,420px)] flex-1 min-h-0 max-h-[min(72dvh,620px)]">
          <Image
            src="/app-download/phone-preview.png?v=3"
            alt=""
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 96vw, 420px"
            className="object-contain object-center"
          />
        </div>

        <div className="flex shrink-0 items-center justify-center gap-3 pb-1">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className={storeButtonClass}
          >
            <PlayStoreIcon className="h-7 w-7" />
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className={storeButtonClass}
          >
            <AppStoreIcon className="h-7 w-7 text-slate-900" />
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

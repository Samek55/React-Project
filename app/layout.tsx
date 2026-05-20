import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from "./GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteTitle = "Nepal Motor | Exchange old cars to EV";
const siteDescription =
  "Nepal Motor is Nepal's No. 1 Car Trading Portal";

/** Used so Open Graph / Twitter resolve relative image paths to absolute production URLs. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nepalmotor.com";

/** Bump when replacing the OG file so Facebook/WhatsApp drop their old cache. */
const ogImage = "/og/default.jpeg?v=2";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Nepal Motor",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

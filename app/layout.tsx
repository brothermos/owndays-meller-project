import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "@/app/providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-barlow-condensed",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OWNDAYS x MELLER",
  description:
    "Explore the OWNDAYS x MELLER sunglasses collaboration with product details, color variants, and styling inspiration.",
  openGraph: {
    title: "OWNDAYS x MELLER",
    description:
      "Shop the OWNDAYS x MELLER collaboration collection with responsive browsing and variant details.",
    images: [
      {
        url: "/images/meta_ogp.jpg",
        width: 1200,
        height: 630,
        alt: "OWNDAYS x MELLER collection",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

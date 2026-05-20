import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";

import { DeferredVercelInsights } from "@/app/components/DeferredVercelInsights";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-barlow-condensed",
  display: "swap",
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
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero_banner_mobile.avif"
          media="(max-width: 640px)"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero_banner_desktop.avif"
          media="(min-width: 641px)"
          type="image/avif"
          fetchPriority="high"
        />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <DeferredVercelInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Geist,
  Geist_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import QueryProvider from "./lib/query-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-barlow-condensed",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "OWNDAYS x MELLER | Product Listing",
  description:
    "Explore the OWNDAYS x MELLER sunglasses collaboration with product details, color variants, and styling inspiration.",
  openGraph: {
    title: "OWNDAYS x MELLER | Product Listing",
    description:
      "Shop the OWNDAYS x MELLER collaboration collection with responsive browsing and variant details.",
    images: [
      {
        url: "https://static.lenskart.com/media/owndays/img/products/36ebdac7-36d3-40a8-9e83-f3cb90b4c9d4.webp",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Analytics />
        <SpeedInsights />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

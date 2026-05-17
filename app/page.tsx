"use client";

import HeroSection from "@/app/containers/HeroSection";
import ProductSection from "@/app/containers/ProductSection";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <HeroSection />
      <ProductSection />
    </main>
  );
}

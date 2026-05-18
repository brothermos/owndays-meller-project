"use client";

import HeroSection from "@/app/containers/HeroSection";
import ProductSection from "@/app/containers/ProductSection";
import StyleCarouselSection from "@/app/containers/StyleCarouselSection";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <HeroSection />
      <ProductSection />
      <StyleCarouselSection />
    </main>
  );
}

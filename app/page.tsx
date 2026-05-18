"use client";

import HeroSection from "@/app/containers/HeroSection";
import ProductSection from "@/app/containers/ProductSection";
import StyleCarouselSection from "@/app/containers/StyleCarouselSection";
import FooterSection from "@/app/containers/FooterSection";
import NavbarSection from "@/app/containers/NavbarSection";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <NavbarSection />
      <HeroSection />
      <ProductSection />
      <StyleCarouselSection />
      <FooterSection />
    </main>
  );
}

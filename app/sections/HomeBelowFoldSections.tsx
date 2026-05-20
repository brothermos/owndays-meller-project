"use client";

import dynamic from "next/dynamic";

import ProductSection from "@/app/sections/ProductSection";

const StyleCarouselSection = dynamic(() => import("@/app/sections/StyleCarouselSection"));

export function HomeBelowFoldSections() {
  return (
    <>
      <ProductSection />
      <StyleCarouselSection />
    </>
  );
}

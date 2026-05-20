"use client";

import dynamic from "next/dynamic";

const ProductDetailModal = dynamic(() => import("@/app/components/ProductDetailModal"), {
  ssr: false,
});

export function ProductDetailModalLazy() {
  return <ProductDetailModal />;
}

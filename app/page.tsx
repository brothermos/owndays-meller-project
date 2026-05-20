import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { productsQueryOptions } from "@/app/services/product.service";

import { getQueryClient } from "@/app/lib/get-query-client";

import { ProductDetailModalLazy } from "@/app/components/ProductDetailModalLazy";
import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";

import HeroSection from "@/app/sections/HeroSection";
import { HomeBelowFoldSections } from "@/app/sections/HomeBelowFoldSections";

import { Providers } from "@/app/providers";

export default async function HomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productsQueryOptions);

  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <HeroSection />
      <Providers>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HomeBelowFoldSections />
          <ProductDetailModalLazy />
        </HydrationBoundary>
      </Providers>
      <Footer />
    </main>
  );
}

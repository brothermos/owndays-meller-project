import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ProductDetailModal from "@/app/components/ProductDetailModal";
import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import { getQueryClient } from "@/app/lib/get-query-client";
import HeroSection from "@/app/sections/HeroSection";
import ProductSection from "@/app/sections/ProductSection";
import StyleCarouselSection from "@/app/sections/StyleCarouselSection";
import { productsQueryOptions } from "@/app/services/product.service";

export default async function HomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productsQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen w-full">
        <Navbar />
        <HeroSection />
        <ProductSection />
        <StyleCarouselSection />
        <Footer />
      </main>
      <ProductDetailModal />
    </HydrationBoundary>
  );
}

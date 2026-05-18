import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import HeroSection from "@/app/containers/HeroSection";
import ProductSection from "@/app/containers/ProductSection";
import StyleCarouselSection from "@/app/containers/StyleCarouselSection";
import FooterSection from "@/app/containers/FooterSection";
import NavbarSection from "@/app/containers/NavbarSection";
import { getQueryClient } from "@/app/lib/get-query-client";
import { productsQueryOptions } from "@/app/services/product.service";

export default async function HomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productsQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen w-full">
        <NavbarSection />
        <HeroSection />
        <ProductSection />
        <StyleCarouselSection />
        <FooterSection />
      </main>
    </HydrationBoundary>
  );
}

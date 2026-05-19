"use client";

import { ProductDetailProvider } from "@/app/contexts/product-detail-context";
import QueryProvider from "@/app/lib/query-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ProductDetailProvider>{children}</ProductDetailProvider>
    </QueryProvider>
  );
}

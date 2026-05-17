import { queryOptions, useQuery } from "@tanstack/react-query";
import { PRODUCTS_API_PATH } from "@/app/config/env";
import { apiClient } from "@/app/lib/api-client";
import { ProductItem, ProductResponse } from "@/app/types/product.type";

export const productQueryKey = ["products", "meller"] as const;

export async function getProducts(): Promise<ProductItem[]> {
  const { data } = await apiClient.get<ProductResponse>(PRODUCTS_API_PATH);

  if (!data.success) {
    throw new Error("Products API returned success=false");
  }

  return data.data;
}

export const productsQueryOptions = queryOptions({
  queryKey: productQueryKey,
  queryFn: getProducts,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
});

export function useProductsQuery() {
  return useQuery(productsQueryOptions);
}

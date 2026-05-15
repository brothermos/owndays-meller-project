import axios from "axios";
import { queryOptions, useQuery } from "@tanstack/react-query";

const PRODUCTS_API_URL = "https://api-one-alpha-60.vercel.app/meller/products.json";

export type ProductResponse = {
  success: boolean;
  total: number;
  data: ProductItem[];
};

export type ProductItem = {
  product: {
    id: number;
    code: string;
    model_name: string;
  };
  localization: {
    description: string;
  };
  selling_setting: {
    price: number;
    in_stock: number;
  };
  frame_types: Array<{
    code: string;
  }>;
  skus: ProductSku[];
};

export type ProductSku = {
  id: number;
  code: string;
  colors: ProductColor[];
  images: ProductImage[];
};

export type ProductColor = {
  name: string;
  path: string | null;
  hex_code: string | null;
};

export type ProductImage = {
  path: string;
  order: number;
};

const productApi = axios.create({
  baseURL: "https://api-one-alpha-60.vercel.app",
  timeout: 15000,
});

export const productQueryKey = ["products", "meller"] as const;

export async function getProducts(): Promise<ProductItem[]> {
  const { data } = await productApi.get<ProductResponse>("/meller/products.json");

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

export { PRODUCTS_API_URL };

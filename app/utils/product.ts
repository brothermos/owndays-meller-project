import type { CSSProperties } from "react";

import type { ProductColor, ProductItem, ProductSku } from "@/app/types/product.type";

import { ONLINE_STORE_BASE, PRODUCT_IMAGE_BASE_URL } from "@/app/config/env";

export const SWATCH_FALLBACK_STYLE: CSSProperties = { backgroundColor: "#d9d9d9" };

export function getColorEnglishName(color: ProductColor): string {
  const enName = color.localizations?.find((loc) => loc.language_code === "en")?.name;
  return (enName ?? color.name).toUpperCase();
}

export function getSkuColorLabel(colors: ProductColor[], separator = " / "): string {
  return colors.map(getColorEnglishName).join(separator);
}

export function getProductImageUrl(path: string) {
  return `${PRODUCT_IMAGE_BASE_URL}${path}`;
}

export function buildOnlineStoreUrl(productCode: string, skuId: number) {
  return `${ONLINE_STORE_BASE}${productCode}?sku=${skuId}`;
}

export function sortSkus(skus: ProductSku[]): ProductSku[] {
  return [...skus].sort((a, b) => a.order - b.order);
}

export function getDefaultSkuIndex(sortedSkus: ProductSku[]): number {
  const idx = sortedSkus.findIndex((sku) => sku.is_default_display === 1);
  return idx >= 0 ? idx : 0;
}

export function getSkuPrimaryImage(sku: ProductSku): string | null {
  const sorted = [...sku.images].sort((a, b) => a.order - b.order);
  return sorted[0]?.path ?? null;
}

export function getSkuLabel(productCode: string, sku: ProductSku) {
  return `${productCode} ${sku.code}`;
}

export function getSwatchStyle(color: ProductColor): CSSProperties {
  if (color.hex_code) {
    return { backgroundColor: color.hex_code };
  }

  if (color.path) {
    return {
      backgroundImage: `url(${getProductImageUrl(color.path)})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }

  return SWATCH_FALLBACK_STYLE;
}

export function findProductSkuByColor(
  products: ProductItem[],
  modelName: string,
  colorLabel: string,
): { product: ProductItem; skuIndex: number } | null {
  const product = products.find(
    (item) => item.product.model_name.toUpperCase() === modelName.toUpperCase(),
  );
  if (!product) return null;

  const sortedSkus = sortSkus(product.skus);
  const target = colorLabel.trim().toLowerCase();
  const skuIndex = sortedSkus.findIndex(
    (sku) => getSkuColorLabel(sku.colors).toLowerCase() === target,
  );

  if (skuIndex < 0) return null;
  return { product, skuIndex };
}

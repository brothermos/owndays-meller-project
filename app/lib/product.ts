import { PRODUCT_IMAGE_BASE_URL } from "@/app/config/env";
import type { ProductColor, ProductSku } from "@/app/types/product.type";
import type { CSSProperties } from "react";

export function getProductImageUrl(path: string) {
  return `${PRODUCT_IMAGE_BASE_URL}${path}`;
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

  return { backgroundColor: "#d9d9d9" };
}

export function getSkuSwatchStyle(colors: ProductColor[]): CSSProperties {
  const validHexColors = colors
    .map((color) => color.hex_code)
    .filter((hex): hex is string => Boolean(hex));

  if (validHexColors.length >= 2) {
    return {
      backgroundImage: `linear-gradient(135deg, ${validHexColors[0]} 0 50%, ${validHexColors[1]} 50% 100%)`,
      backgroundClip: "padding-box",
    };
  }

  if (colors[0]) {
    return getSwatchStyle(colors[0]);
  }

  return { backgroundColor: "#d9d9d9" };
}

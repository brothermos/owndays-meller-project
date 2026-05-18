import { getProductImageUrl, getSkuPrimaryImage } from "@/app/lib/product";
import { ProductItem } from "@/app/types/product.type";
import { useMemo, useState } from "react";

const useProductCard = (product: ProductItem) => {
  const [selectedSkuIndex, setSelectedSkuIndex] = useState<number>(0);

  const selectedSku = product.skus[selectedSkuIndex] ?? product.skus[0];

  const skuImageUrls = useMemo(
    () =>
      product.skus.slice(0, 4).map((sku) => {
        const path = getSkuPrimaryImage(sku);
        return path ? getProductImageUrl(path) : null;
      }),
    [product.skus],
  );

  const hasAnyImage = skuImageUrls.some(Boolean);

  return {
    skuImageUrls,
    hasAnyImage,
    selectedSkuIndex,
    setSelectedSkuIndex,
    selectedSku,
  };
};

export default useProductCard;

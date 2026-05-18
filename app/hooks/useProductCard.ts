import {
  getDefaultSkuIndex,
  getProductImageUrl,
  getSkuPrimaryImage,
  sortSkus,
} from "@/app/lib/product";
import { ProductItem } from "@/app/types/product.type";
import { useMemo, useState } from "react";

const useProductCard = (product: ProductItem) => {
  const sortedSkus = useMemo(() => sortSkus(product.skus), [product.skus]);

  const [selectedSkuIndex, setSelectedSkuIndex] = useState<number>(() =>
    getDefaultSkuIndex(sortedSkus),
  );

  const selectedSku = sortedSkus[selectedSkuIndex] ?? sortedSkus[0];

  const skuImageUrls = useMemo(
    () =>
      sortedSkus.slice(0, 4).map((sku) => {
        const path = getSkuPrimaryImage(sku);
        return path ? getProductImageUrl(path) : null;
      }),
    [sortedSkus],
  );

  const hasAnyImage = skuImageUrls.some(Boolean);

  return {
    sortedSkus,
    skuImageUrls,
    hasAnyImage,
    selectedSkuIndex,
    setSelectedSkuIndex,
    selectedSku,
  };
};

export default useProductCard;

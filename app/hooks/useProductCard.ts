import { type KeyboardEvent, useCallback, useMemo, useState } from "react";

import type { ProductItem } from "@/app/types/product.type";

import { useProductDetail } from "@/app/contexts/product-detail-context";

import { formatGridPrice } from "@/app/utils/format";
import {
  getDefaultSkuIndex,
  getProductImageUrl,
  getSkuLabel,
  getSkuPrimaryImage,
  sortSkus,
} from "@/app/utils/product";

export function useProductCard(product: ProductItem) {
  const { openModal } = useProductDetail();

  const sortedSkus = useMemo(() => sortSkus(product.skus), [product.skus]);

  const [selectedSkuIndex, setSelectedSkuIndex] = useState(() => getDefaultSkuIndex(sortedSkus));

  const selectedSku = sortedSkus[selectedSkuIndex] ?? sortedSkus[0];

  const skuImageUrls = useMemo(
    () =>
      sortedSkus.slice(0, 4).map((sku) => {
        const path = getSkuPrimaryImage(sku);
        return path ? getProductImageUrl(path) : null;
      }),
    [sortedSkus],
  );

  const displaySkus = useMemo(
    () =>
      sortedSkus.slice(0, 4).flatMap((sku, index) => {
        if (!sku.colors[0]) return [];

        return [
          {
            sku,
            index,
            isSelected: index === selectedSkuIndex,
          },
        ];
      }),
    [sortedSkus, selectedSkuIndex],
  );

  const hasAnyImage = skuImageUrls.some(Boolean);
  const skuLabel = getSkuLabel(product.product.code, selectedSku);
  const formattedPrice = formatGridPrice(product.selling_setting.price);
  const modelName = product.product.model_name;

  const openProductDetail = useCallback(() => {
    openModal(product, selectedSkuIndex);
  }, [openModal, product, selectedSkuIndex]);

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProductDetail();
      }
    },
    [openProductDetail],
  );

  const selectSku = useCallback((index: number) => {
    setSelectedSkuIndex(index);
  }, []);

  return {
    skuImageUrls,
    displaySkus,
    hasAnyImage,
    selectedSkuIndex,
    skuLabel,
    formattedPrice,
    modelName,
    handleCardClick: openProductDetail,
    handleCardKeyDown,
    selectSku,
  };
}

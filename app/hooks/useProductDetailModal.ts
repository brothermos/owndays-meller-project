import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { getProductImageUrl, getSkuColorLabel, sortSkus } from "@/app/lib/product";
import type { ProductItem } from "@/app/types/product.type";
import { formatModalPrice } from "@/app/utils/format";
import { ONLINE_STORE_BASE } from "@/app/config/env";

type UseProductDetailModalOptions = {
  selectedProduct: ProductItem;
  initialSkuIndex: number;
};

export function useProductDetailModal(props: UseProductDetailModalOptions) {
  const { selectedProduct, initialSkuIndex } = props;

  const [selectedSkuIndex, setSelectedSkuIndex] = useState(initialSkuIndex);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: "trimSnaps",
  });
  const isFirstEmblaSync = useRef(true);

  const buildOnlineStoreUrl = (productCode: string, skuId: number) =>
    `${ONLINE_STORE_BASE}/${productCode}?sku=${skuId}`;

  useEffect(() => {
    if (!emblaApi) return;
    if (isFirstEmblaSync.current) {
      isFirstEmblaSync.current = false;
      return;
    }
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [emblaApi, selectedSkuIndex, selectedProduct]);

  const sortedSkus = useMemo(() => sortSkus(selectedProduct.skus), [selectedProduct.skus]);

  const selectedSku = sortedSkus[selectedSkuIndex] ?? sortedSkus[0];

  const skuImageUrls = useMemo(() => {
    if (!selectedSku) return [];
    return [...selectedSku.images].sort((a, b) => a.order - b.order).map((img) => getProductImageUrl(img.path));
  }, [selectedSku]);

  const colorChips = useMemo(
    () =>
      sortedSkus.map((sku, index) => ({
        skuId: sku.id,
        index,
        label: getSkuColorLabel(sku.colors),
        isActive: index === selectedSkuIndex,
      })),
    [sortedSkus, selectedSkuIndex],
  );

  const frameType = selectedProduct.frame_types[0]?.code?.toUpperCase() ?? "—";
  const skuLabel = selectedSku ? `${selectedProduct.product.code} ${selectedSku.code}` : "";
  const isOutOfStock = selectedProduct.selling_setting.in_stock === 0;
  const formattedPrice = formatModalPrice(selectedProduct.selling_setting.price);
  const onlineStoreHref = selectedSku ? buildOnlineStoreUrl(selectedProduct.product.code, selectedSku.id) : "#";
  const modelName = selectedProduct.product.model_name;
  const description = selectedProduct.localization.description;

  return {
    emblaRef,
    skuImageUrls,
    colorChips,
    frameType,
    skuLabel,
    isOutOfStock,
    formattedPrice,
    onlineStoreHref,
    modelName,
    description,
    selectedSku,
    setSelectedSkuIndex,
  };
}

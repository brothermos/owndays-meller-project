import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useFocusTrap } from "@/app/hooks/useFocusTrap";
import { getProductImageUrl, getSkuColorLabel, sortSkus } from "@/app/lib/product";
import type { ProductItem } from "@/app/types/product.type";
import { formatModalPrice } from "@/app/utils/format";

const ONLINE_STORE_BASE = "https://www.owndays.com/jp/ja/products";

const buildOnlineStoreUrl = (productCode: string, skuId: number) => `${ONLINE_STORE_BASE}/${productCode}?sku=${skuId}`;

type UseProductDetailModalOptions = {
  selectedProduct: ProductItem;
  initialSkuIndex: number;
  isOpen: boolean;
};

export function useProductDetailModal(props: UseProductDetailModalOptions) {
  const { selectedProduct, initialSkuIndex, isOpen } = props;

  const [selectedSkuIndex, setSelectedSkuIndex] = useState(initialSkuIndex);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: "trimSnaps",
  });
  const isFirstEmblaSync = useRef(true);
  const dialogRef = useRef<HTMLElement>(null);

  useFocusTrap(dialogRef, isOpen);

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
    dialogRef,
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
    selectSku: setSelectedSkuIndex,
  };
}

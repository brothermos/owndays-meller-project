import { getProductImageUrl, getSkuPrimaryImage } from "@/app/lib/product";
import { ProductItem } from "@/app/types/product.type";
import { useEffect, useMemo, useState } from "react";

const useProductCard = (product: ProductItem) => {
  const [selectedSkuIndex, setSelectedSkuIndex] = useState<number>(0);

  const selectedSku = product.skus[selectedSkuIndex] ?? product.skus[0];

  const primaryImagePath = useMemo(
    () => (selectedSku ? getSkuPrimaryImage(selectedSku) : null),
    [selectedSku],
  );

  const currentImageUrl = useMemo(
    () => (primaryImagePath ? getProductImageUrl(primaryImagePath) : null),
    [primaryImagePath],
  );

  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(
    currentImageUrl,
  );

  const skuImageUrls = useMemo(
    () =>
      product.skus
        .slice(0, 4)
        .map((sku) => getSkuPrimaryImage(sku))
        .filter((path): path is string => Boolean(path))
        .map((path) => getProductImageUrl(path)),
    [product.skus],
  );

  useEffect(() => {
    skuImageUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, [skuImageUrls]);

  return {
    currentImageUrl,
    loadedImageUrl,
    setLoadedImageUrl,
    selectedSkuIndex,
    setSelectedSkuIndex,
    selectedSku,
  };
};

export default useProductCard;

import { useCallback, useRef } from "react";

import { STYLE_CAROUSEL_SLIDES } from "@/app/constants/style-carousel";
import { DRAG_THRESHOLD_PX } from "@/app/constants/style-carousel-section";

import { useProductDetail } from "@/app/contexts/product-detail-context";

import { useProductsQuery } from "@/app/services/product.service";

import { findProductSkuByColor } from "@/app/utils/product";

export function useStyleCarouselSection() {
  const { data: products } = useProductsQuery();
  const { openModal } = useProductDetail();
  const slidePointerStart = useRef<{ x: number; y: number } | null>(null);

  const handleSlideClick = useCallback(
    (slideIndex: number) => {
      if (!products) return;

      const target = STYLE_CAROUSEL_SLIDES[slideIndex];
      if (!target) return;

      const match = findProductSkuByColor(products, target.modelName, target.colorLabel);
      if (!match) return;

      openModal(match.product, match.skuIndex);
    },
    [products, openModal],
  );

  const onSlidePointerDown = useCallback((event: React.PointerEvent<HTMLLIElement>) => {
    slidePointerStart.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const onSlideClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>, slideIndex: number) => {
      const start = slidePointerStart.current;
      slidePointerStart.current = null;
      if (!start) return;

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) return;

      handleSlideClick(slideIndex);
    },
    [handleSlideClick],
  );

  const onSlideKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>, slideIndex: number) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSlideClick(slideIndex);
      }
    },
    [handleSlideClick],
  );

  return {
    slides: STYLE_CAROUSEL_SLIDES,
    onSlidePointerDown,
    onSlideClick,
    onSlideKeyDown,
  };
}

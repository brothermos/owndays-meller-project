import { useCallback, useMemo, type MouseEvent } from "react";

import { getProductImageUrl, getSwatchStyle } from "@/app/lib/product";
import type { ProductSku } from "@/app/types/product.type";
import { SWATCH_RING_CLASS } from "../constants/color-swatch-button";
import type { ColorSwatchVariant } from "../types/color-swatch-button.type";

export function useColorSwatchButton(sku: ProductSku, isSelected: boolean, onSelect: () => void) {
  const ringClass = isSelected ? SWATCH_RING_CLASS.selected : SWATCH_RING_CLASS.default;

  const hexColors = useMemo(
    () => sku.colors.map((color) => color.hex_code).filter((hex): hex is string => Boolean(hex)),
    [sku.colors],
  );

  const patternColor = useMemo(() => sku.colors.find((color) => color.path), [sku.colors]);

  const variant = useMemo((): ColorSwatchVariant => {
    if (hexColors.length >= 2) return "dual";
    if (patternColor?.path) return "pattern";
    return "solid";
  }, [hexColors.length, patternColor?.path]);

  const solidStyle = useMemo(
    () => (sku.colors[0] ? getSwatchStyle(sku.colors[0]) : { backgroundColor: "#d9d9d9" }),
    [sku.colors],
  );

  const patternStyle = useMemo(
    () => ({
      backgroundImage: patternColor?.path ? `url(${getProductImageUrl(patternColor.path)})` : undefined,
      backgroundColor: hexColors[0] ?? undefined,
    }),
    [patternColor?.path, hexColors],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onSelect();
    },
    [onSelect],
  );

  return {
    variant,
    ringClass,
    hexColors,
    solidStyle,
    patternStyle,
    title: sku.code,
    ariaLabel: `Select ${sku.code}`,
    isSelected,
    handleClick,
  };
}

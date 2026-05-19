import { useCallback, useMemo, type MouseEvent } from "react";

import { getProductImageUrl, getSwatchStyle } from "@/app/lib/product";
import type { ProductSku } from "@/app/types/product.type";

export const SWATCH_BASE_CLASS =
  "size-7 rounded-full transition-[box-shadow,transform] duration-150 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const SWATCH_RING_CLASS = {
  selected: "ring-2 ring-offset-[5px] ring-primary",
  default: "ring-1 ring-offset-0 ring-transparent hover:ring-gray-400",
} as const;

export type ColorSwatchVariant = "dual" | "pattern" | "solid";

export function useColorSwatchButton(
  sku: ProductSku,
  isSelected: boolean,
  onSelect: () => void,
) {
  const ringClass = isSelected
    ? SWATCH_RING_CLASS.selected
    : SWATCH_RING_CLASS.default;

  const hexColors = useMemo(
    () =>
      sku.colors
        .map((color) => color.hex_code)
        .filter((hex): hex is string => Boolean(hex)),
    [sku.colors],
  );

  const patternColor = useMemo(
    () => sku.colors.find((color) => color.path),
    [sku.colors],
  );

  const variant = useMemo((): ColorSwatchVariant => {
    if (hexColors.length >= 2) return "dual";
    if (patternColor?.path) return "pattern";
    return "solid";
  }, [hexColors.length, patternColor?.path]);

  const solidStyle = useMemo(
    () =>
      sku.colors[0] ? getSwatchStyle(sku.colors[0]) : { backgroundColor: "#d9d9d9" },
    [sku.colors],
  );

  const patternStyle = useMemo(
    () => ({
      backgroundImage: patternColor?.path
        ? `url(${getProductImageUrl(patternColor.path)})`
        : undefined,
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

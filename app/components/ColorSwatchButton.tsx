"use client";

import { getProductImageUrl, getSwatchStyle } from "@/app/lib/product";
import type { ProductSku } from "@/app/types/product.type";

type ColorSwatchButtonProps = {
  sku: ProductSku;
  isSelected: boolean;
  onSelect: () => void;
};

const SWATCH_BASE_CLASS =
  "size-7 rounded-full transition-[box-shadow,transform] duration-150 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const SWATCH_RING_CLASS = {
  selected: "ring-2 ring-offset-[5px] ring-primary",
  default:
    "ring-1 ring-offset-0 ring-transparent hover:ring-gray-400",
} as const;

const ColorSwatchButton = ({ sku, isSelected, onSelect }: ColorSwatchButtonProps) => {
  const ringClass = isSelected
    ? SWATCH_RING_CLASS.selected
    : SWATCH_RING_CLASS.default;

  const hexColors = sku.colors
    .map((color) => color.hex_code)
    .filter((hex): hex is string => Boolean(hex));

  const patternColor = sku.colors.find((color) => color.path);

  if (hexColors.length >= 2) {
    return (
      <button
        type="button"
        title={sku.code}
        aria-label={`Select ${sku.code}`}
        aria-pressed={isSelected}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        className={`${SWATCH_BASE_CLASS} relative overflow-hidden ${ringClass}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundColor: hexColors[0],
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundColor: hexColors[1],
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          }}
        />
      </button>
    );
  }

  if (patternColor?.path) {
    return (
      <button
        type="button"
        title={sku.code}
        aria-label={`Select ${sku.code}`}
        aria-pressed={isSelected}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        className={`${SWATCH_BASE_CLASS} bg-contain ${ringClass}`}
        style={{
          backgroundImage: `url(${getProductImageUrl(patternColor.path)})`,
          backgroundColor: hexColors[0] ?? undefined,
        }}
      />
    );
  }

  const swatchStyle = sku.colors[0]
    ? getSwatchStyle(sku.colors[0])
    : { backgroundColor: "#d9d9d9" };

  return (
    <button
      type="button"
      title={sku.code}
      aria-label={`Select ${sku.code}`}
      aria-pressed={isSelected}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      className={`${SWATCH_BASE_CLASS} ${ringClass}`}
      style={swatchStyle}
    />
  );
};

export default ColorSwatchButton;

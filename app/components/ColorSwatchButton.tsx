"use client";

import type { ProductSku } from "@/app/types/product.type";

import { SWATCH_BASE_CLASS } from "@/app/constants/color-swatch-button";
import { useColorSwatchButton } from "@/app/hooks/useColorSwatchButton";

type ColorSwatchButtonProps = {
  sku: ProductSku;
  isSelected: boolean;
  onSelect: () => void;
};

const ColorSwatchButton = (props: ColorSwatchButtonProps) => {
  const { sku, isSelected, onSelect } = props;

  const { variant, ringClass, hexColors, solidStyle, patternStyle, title, ariaLabel, handleClick } =
    useColorSwatchButton(sku, isSelected, onSelect);

  if (variant === "dual") {
    return (
      <button
        type="button"
        title={title}
        aria-label={ariaLabel}
        aria-pressed={isSelected}
        onClick={handleClick}
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

  if (variant === "pattern") {
    return (
      <button
        type="button"
        title={title}
        aria-label={ariaLabel}
        aria-pressed={isSelected}
        onClick={handleClick}
        className={`${SWATCH_BASE_CLASS} bg-contain ${ringClass}`}
        style={patternStyle}
      />
    );
  }

  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      onClick={handleClick}
      className={`${SWATCH_BASE_CLASS} ${ringClass}`}
      style={solidStyle}
    />
  );
};

export default ColorSwatchButton;

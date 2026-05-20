"use client";

import Image from "next/image";

import type { ProductItem } from "@/app/types/product.type";

import { useProductCard } from "@/app/hooks/useProductCard";

import ColorSwatchButton from "@/app/components/product-card/ColorSwatchButton";

type ProductCardProps = {
  product: ProductItem;
  eagerImage?: boolean;
};

const ProductCard = (props: ProductCardProps) => {
  const { product, eagerImage = false } = props;

  const {
    skuImageUrls,
    displaySkus,
    selectedSkuIndex,
    isOutOfStock,
    skuLabel,
    formattedPrice,
    modelName,
    handleCardClick,
    handleCardKeyDown,
    selectSku,
  } = useProductCard(product);

  const activeImageUrl = skuImageUrls[selectedSkuIndex] ?? skuImageUrls.find((url) => Boolean(url));

  return (
    <article
      role={isOutOfStock ? undefined : "button"}
      tabIndex={isOutOfStock ? undefined : 0}
      aria-disabled={isOutOfStock || undefined}
      aria-label={`View ${modelName} details`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={`group flex flex-col bg-white text-black outline-2 outline-black transition-transform duration-300 ease-out lg:outline-transparent ${
        isOutOfStock
          ? "cursor-default"
          : "cursor-pointer motion-safe:hover:scale-[1.03] lg:hover:outline-black"
      }`}
    >
      <div className="aspect-4/3 w-full bg-white p-4">
        <div className="relative isolate size-full overflow-hidden bg-[#F7F7F7]">
          {activeImageUrl ? (
            <Image
              key={activeImageUrl}
              src={activeImageUrl}
              alt={modelName}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              quality={60}
              loading={eagerImage ? "eager" : "lazy"}
              className={`object-contain p-6 mix-blend-multiply ${isOutOfStock ? "grayscale" : ""}`}
            />
          ) : (
            <div className="flex size-full items-center justify-center p-6 text-sm font-medium text-black/50">
              Image unavailable
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
              <span className="bg-black px-4 py-2 font-display text-2xl font-bold tracking-wider text-white uppercase">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-display text-5xl leading-tight font-bold tracking-tight uppercase">
              {modelName}
            </div>
          </div>

          <div className="flex max-w-[161px] shrink-0 flex-wrap justify-end gap-[3px]">
            {displaySkus.map(({ sku, index, isSelected }) => (
              <div key={sku.id} className="flex size-[38px] shrink-0 items-center justify-center">
                <ColorSwatchButton
                  sku={sku}
                  isSelected={isSelected}
                  onSelect={() => selectSku(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-base text-black/80">{skuLabel}</p>
          <p className="text-right text-xl font-bold">{formattedPrice}</p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

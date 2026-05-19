"use client";

import Image from "next/image";
import {
  getSkuColorLabel,
  getSkuLabel,
  getSkuSwatchStyle,
} from "@/app/lib/product";
import type { ProductItem } from "@/app/types/product.type";
import { formatGridPrice } from "../utils/format";
import useProductCard from "@/app/hooks/useProductCard";
import { useProductDetail } from "@/app/contexts/product-detail-context";

type ProductCardProps = {
  product: ProductItem;
  eagerImage?: boolean;
};

const ProductCard = (props: ProductCardProps) => {
  const { product, eagerImage = false } = props;

  const {
    sortedSkus,
    skuImageUrls,
    hasAnyImage,
    selectedSkuIndex,
    setSelectedSkuIndex,
    selectedSku,
  } = useProductCard(product);

  const isOutOfStock = product.selling_setting.in_stock === 0;
  const { openModal } = useProductDetail();

  const handleCardClick = () => {
    if (isOutOfStock) return;
    openModal(product, selectedSkuIndex);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (isOutOfStock) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(product, selectedSkuIndex);
    }
  };

  return (
    <article
      role={isOutOfStock ? undefined : "button"}
      tabIndex={isOutOfStock ? undefined : 0}
      aria-disabled={isOutOfStock || undefined}
      aria-label={`View ${product.product.model_name} details`}
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
          {hasAnyImage ? (
            skuImageUrls.map((url, index) => {
              if (!url) return null;
              const isActive = index === selectedSkuIndex;
              return (
                <Image
                  key={url}
                  src={url}
                  alt={product.product.model_name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  quality={60}
                  loading={index === 0 && eagerImage ? "eager" : "lazy"}
                  className={`object-contain p-6 mix-blend-multiply transition-opacity duration-150 ${
                    isActive ? "opacity-100" : "opacity-0"
                  } ${isOutOfStock ? "grayscale" : ""}`}
                />
              );
            })
          ) : (
            <div className="flex size-full items-center justify-center p-6 text-sm font-medium text-black/50">
              Image unavailable
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
              <span className="font-display bg-black px-4 py-2 text-2xl font-bold uppercase tracking-wider text-white">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-display text-5xl font-bold uppercase leading-tight tracking-tight">
              {product.product.model_name}
            </div>
          </div>

          <div className="flex max-w-[161px] shrink-0 flex-wrap justify-end gap-[3px]">
            {sortedSkus.slice(0, 4).map((sku, index) => {
              const firstColor = sku.colors[0];
              if (!firstColor) return null;

              const isSelected = index === selectedSkuIndex;
              const swatchStyle = getSkuSwatchStyle(sku.colors);
              const colorLabel = getSkuColorLabel(sku.colors);

              return (
                <button
                  key={sku.id}
                  type="button"
                  aria-label={`Select ${colorLabel}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedSkuIndex(index);
                  }}
                  className="flex size-[38px] shrink-0 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <span
                    className={`size-[28px] shrink-0 rounded-full border border-black/10 ${
                      isSelected
                        ? "ring-2 ring-primary ring-offset-4 ring-offset-white"
                        : ""
                    }`}
                    style={swatchStyle}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-base text-black/80">
            {getSkuLabel(product.product.code, selectedSku)}
          </p>
          <p className="text-right text-xl font-bold">
            {formatGridPrice(product.selling_setting.price)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

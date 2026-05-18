"use client";

import Image from "next/image";
import { getSkuLabel, getSkuSwatchStyle } from "@/app/lib/product";
import type { ProductItem } from "@/app/types/product.type";
import { formatGridPrice } from "../utils/format";
import useProductCard from "@/app/hooks/useProductCard";

type ProductCardProps = {
  product: ProductItem;
  eagerImage?: boolean;
};

const ProductCard = (props: ProductCardProps) => {
  const { product, eagerImage = false } = props;

  const {
    currentImageUrl,
    loadedImageUrl,
    setLoadedImageUrl,
    selectedSkuIndex,
    setSelectedSkuIndex,
    selectedSku,
  } = useProductCard(product);

  return (
    <article className="group flex flex-col bg-white text-black outline-2 outline-black transition-all duration-500 ease-in-out motion-safe:hover:scale-[1.03] lg:outline-transparent lg:hover:outline-black">
      <div className="aspect-4/3 w-full bg-white p-4">
        <div className="relative isolate size-full overflow-hidden bg-[#F7F7F7]">
          {currentImageUrl ? (
            <Image
              key={currentImageUrl}
              src={currentImageUrl}
              alt={product.product.model_name}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              loading={eagerImage ? "eager" : "lazy"}
              onLoad={() => setLoadedImageUrl(currentImageUrl)}
              className={`object-contain p-6 mix-blend-multiply transition-opacity duration-200 ${
                loadedImageUrl === currentImageUrl ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="flex size-full items-center justify-center p-6 text-sm font-medium text-black/50">
              Image unavailable
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 sm:px-4 pb-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-display font-bold uppercase leading-tight tracking-tight text-5xl">
              {product.product.model_name}
            </div>
          </div>

          <div className="flex max-w-[161px] shrink-0 flex-wrap justify-end gap-[3px]">
            {product.skus.slice(0, 4).map((sku, index) => {
              const firstColor = sku.colors[0];
              if (!firstColor) return null;

              const isSelected = index === selectedSkuIndex;
              const swatchStyle = getSkuSwatchStyle(sku.colors);
              const colorLabel = sku.colors
                .map((color) => color.name)
                .join(" / ");

              return (
                <button
                  key={sku.id}
                  type="button"
                  aria-label={`Select ${colorLabel}`}
                  onClick={() => setSelectedSkuIndex(index)}
                  className="flex size-[38px] shrink-0 items-center justify-center"
                >
                  <span
                    className={`size-[28px] shrink-0 rounded-full border border-black/10 ${
                      isSelected
                        ? "ring-[1px] ring-[#ff6723] ring-offset-4 ring-offset-white"
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
          <p className="text-black/80 text-base">
            {getSkuLabel(product.product.code, selectedSku)}
          </p>
          <p className="text-right font-bold text-xl">
            {formatGridPrice(product.selling_setting.price)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

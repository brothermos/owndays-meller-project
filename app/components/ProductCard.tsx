"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  getProductImageUrl,
  getSkuLabel,
  getSkuPrimaryImage,
  getSwatchStyle,
} from "@/app/lib/product";
import type { ProductItem } from "@/app/types/product.type";
import { formatGridPrice } from "../utils/format";

type ProductCardProps = {
  product: ProductItem;
  eagerImage?: boolean;
};

const ProductCard = ({ product, eagerImage = false }: ProductCardProps) => {
  const [selectedSkuIndex, setSelectedSkuIndex] = useState(0);

  const selectedSku = product.skus[selectedSkuIndex] ?? product.skus[0];
  const primaryImagePath = useMemo(
    () => (selectedSku ? getSkuPrimaryImage(selectedSku) : null),
    [selectedSku],
  );

  if (!selectedSku) {
    return null;
  }

  return (
    <article className="group flex flex-col bg-white text-black outline-2 outline-transparent transition-all duration-500 ease-in-out motion-safe:hover:scale-[1.03] hover:outline-black">
      <div className="aspect-4/3 w-full bg-[#F7F7F7] p-4">
        <div className="relative isolate size-full overflow-hidden bg-white">
          {primaryImagePath ? (
            <Image
              src={getProductImageUrl(primaryImagePath)}
              alt={product.product.model_name}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              loading={eagerImage ? "eager" : "lazy"}
              className="object-contain p-6 mix-blend-multiply"
            />
          ) : (
            <div className="flex size-full items-center justify-center p-6 text-sm font-medium text-black/50">
              Image unavailable
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-display text-xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              {product.product.model_name}
            </div>
          </div>

          <div className="flex max-w-[161px] shrink-0 flex-wrap justify-end gap-[3px]">
            {product.skus.slice(0, 4).map((sku, index) => {
              const color = sku.colors[0];
              if (!color) return null;

              const isSelected = index === selectedSkuIndex;

              return (
                <button
                  key={sku.id}
                  type="button"
                  aria-label={`Select ${color.name}`}
                  onClick={() => setSelectedSkuIndex(index)}
                  className="flex size-[38px] shrink-0 items-center justify-center"
                >
                  <span
                    className={`size-[28px] shrink-0 rounded-full border border-black/10 ${
                      isSelected
                        ? "ring-[1px] ring-[#ff6723] ring-offset-4 ring-offset-white"
                        : ""
                    }`}
                    style={getSwatchStyle(color)}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-xs text-black/80 sm:text-base">
            {getSkuLabel(product.product.code, selectedSku)}
          </p>
          <p className="text-right text-lg font-bold sm:text-xl">
            {formatGridPrice(product.selling_setting.price)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

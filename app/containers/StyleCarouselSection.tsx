"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { useProductDetail } from "@/app/contexts/product-detail-context";
import { findProductSkuByColor } from "@/app/lib/product";
import { useProductsQuery } from "@/app/services/product.service";

const CAROUSEL_SLIDE_TARGETS = [
  { modelName: "ADISA", colorLabel: "clear gray" },
  { modelName: "TANA", colorLabel: "brown demi" },
  { modelName: "NAYAH", colorLabel: "black" },
  { modelName: "CUMBI", colorLabel: "brown demi" },
  { modelName: "NAYAH", colorLabel: "black / orange" },
  { modelName: "KESSIE", colorLabel: "black" },
  { modelName: "NAYAH", colorLabel: "brown demi" },
  { modelName: "CUMBI", colorLabel: "brown demi" },
  { modelName: "ADISA", colorLabel: "black" },
  { modelName: "CHAUEN", colorLabel: "brown demi" },
  { modelName: "ADISA", colorLabel: "clear green" },
  { modelName: "TANA", colorLabel: "brown demi" },
] as const;

const CAROUSEL_IMAGES = [
  "/images/carousel_1.avif",
  "/images/carousel_2.avif",
  "/images/carousel_3.avif",
  "/images/carousel_4.avif",
  "/images/carousel_5.avif",
  "/images/carousel_6.avif",
  "/images/carousel_7.avif",
  "/images/carousel_8.avif",
  "/images/carousel_9.avif",
  "/images/carousel_10.avif",
  "/images/carousel_11.avif",
  "/images/carousel_12.avif",
];

const DRAG_THRESHOLD_PX = 8;

const StyleCarouselSection = () => {
  const { data: products } = useProductsQuery();
  const { openModal } = useProductDetail();
  const slidePointerStart = useRef<{ x: number; y: number } | null>(null);

  const handleSlideClick = useCallback(
    (slideIndex: number) => {
      if (!products) return;

      const target = CAROUSEL_SLIDE_TARGETS[slideIndex];
      if (!target) return;

      const match = findProductSkuByColor(
        products,
        target.modelName,
        target.colorLabel,
      );
      if (!match) return;

      openModal(match.product, match.skuIndex);
    },
    [products, openModal],
  );

  const handleSlidePointerUp = useCallback(
    (event: React.PointerEvent<HTMLLIElement>, slideIndex: number) => {
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

  return (
    <section className="bg-primary">
      <div className="px-4 sm:px-8 lg:px-[70px]">
        <div className="relative z-10 mb-[-28px] inline-flex flex-col items-start lg:mb-[-46px]">
          <span className="font-display inline-block bg-black text-[72px] font-bold leading-none tracking-tight text-primary [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[120px]">
            HOW TO
          </span>
          <span className="font-display mt-6 inline-block bg-black text-[72px] font-bold leading-none tracking-tight text-primary [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[120px]">
            STYLE THEM
          </span>
        </div>
      </div>

      <div
        role="region"
        aria-label="How to style them gallery"
        className="-mb-5 -mt-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-5 pt-5 [-ms-overflow-style:none] scrollbar-none touch-pan-x [&::-webkit-scrollbar]:hidden lg:-mb-6 lg:-mt-6 lg:pb-6 lg:pt-6"
      >
        <ul className="flex w-max pr-4 sm:pr-8 lg:pr-[70px]">
          {CAROUSEL_IMAGES.map((imageSrc, index) => {
            const target = CAROUSEL_SLIDE_TARGETS[index];
            const slideLabel = target
              ? `${target.modelName} ${target.colorLabel}`
              : `look ${index + 1}`;

            return (
              <li
                key={imageSrc}
                role="button"
                tabIndex={0}
                aria-label={`Open ${slideLabel} product details`}
                onPointerDown={(event) => {
                  slidePointerStart.current = {
                    x: event.clientX,
                    y: event.clientY,
                  };
                }}
                onPointerUp={(event) => handleSlidePointerUp(event, index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSlideClick(index);
                  }
                }}
                className="group relative h-[492px] w-[326px] shrink-0 cursor-pointer overflow-hidden outline-2 outline-black transition-[outline-color,transform,z-index] duration-500 ease-in-out lg:h-[611px] lg:w-[405px] lg:outline-transparent lg:hover:z-10 lg:hover:overflow-visible lg:hover:outline-black"
              >
                <div className="absolute inset-0 transition-transform duration-500 ease-in-out motion-safe:group-hover:scale-[1.03]">
                  <Image
                    src={imageSrc}
                    alt={`How to style look ${index + 1}`}
                    fill
                    quality={60}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    sizes="(max-width: 1024px) 326px, 405px"
                    className="relative z-0 object-cover motion-safe:group-hover:z-20"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 right-0 z-10 flex size-[70px] items-center justify-center bg-primary motion-safe:group-hover:z-0"
                  >
                    <Image
                      src="/svg/plus_icon.svg"
                      alt=""
                      width={28}
                      height={28}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default StyleCarouselSection;

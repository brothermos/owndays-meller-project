"use client";

import Image from "next/image";

import { getStyleCarouselSlideLabel } from "@/app/utils/carousel";

import { useStyleCarouselSection } from "@/app/hooks/useStyleCarouselSection";

const StyleCarouselSection = () => {
  const { slides, onSlidePointerDown, onSlideClick, onSlideKeyDown } = useStyleCarouselSection();

  return (
    <section id="style" className="bg-primary">
      <div className="px-4 sm:px-8 lg:px-[70px]">
        <div className="relative z-10 mb-[-28px] inline-flex flex-col items-start lg:mb-[-46px]">
          <span className="inline-block bg-black font-display text-[72px] leading-none font-bold tracking-tight text-primary [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[120px]">
            HOW TO
          </span>
          <span className="mt-6 inline-block bg-black font-display text-[72px] leading-none font-bold tracking-tight text-primary [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[120px]">
            STYLE THEM
          </span>
        </div>
      </div>

      <div
        role="region"
        aria-label="How to style them gallery"
        className="-mt-5 -mb-5 scrollbar-none overflow-x-auto overscroll-x-contain scroll-smooth pt-5 pb-5 [-ms-overflow-style:none] lg:-mt-6 lg:-mb-6 lg:pt-6 lg:pb-6 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex">
          {slides.map((slide, index) => {
            const slideLabel = getStyleCarouselSlideLabel(index);

            return (
              <li
                key={slide.image}
                role="button"
                tabIndex={0}
                aria-label={`Open ${slideLabel} product details`}
                onPointerDown={onSlidePointerDown}
                onClick={(event) => onSlideClick(event, index)}
                onKeyDown={(event) => onSlideKeyDown(event, index)}
                className="group relative h-[492px] w-[326px] shrink-0 cursor-pointer overflow-hidden outline-2 outline-black transition-[transform,outline-color] duration-500 ease-in-out active:cursor-grabbing motion-safe:hover:scale-[1.03] lg:h-[611px] lg:w-[405px] lg:outline-transparent lg:hover:z-10 lg:hover:outline-black"
              >
                <Image
                  src={slide.image}
                  alt={`How to style look ${index + 1}`}
                  fill
                  quality={60}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(max-width: 1024px) 326px, 405px"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 bottom-0 z-20 flex size-[70px] items-center justify-center bg-primary"
                >
                  <Image
                    src="/svg/plus_icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden="true"
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default StyleCarouselSection;

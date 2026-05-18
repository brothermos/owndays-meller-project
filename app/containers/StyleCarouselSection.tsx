"use client";

import Image from "next/image";

const CAROUSEL_IMAGES = [
  "/images/carousel_1.png",
  "/images/carousel_2.png",
  "/images/carousel_3.png",
  "/images/carousel_4.png",
  "/images/carousel_5.png",
  "/images/carousel_6.png",
  "/images/carousel_7.png",
  "/images/carousel_8.png",
  "/images/carousel_9.png",
  "/images/carousel_10.png",
  "/images/carousel_11.png",
  "/images/carousel_12.png",
];

const StyleCarouselSection = () => {
  return (
    <>
      <section className="bg-primary pt-10 lg:pt-16">
        <div className="px-4 sm:px-8 lg:px-[70px]">
          <div className="relative z-10 mb-[-28px] inline-flex flex-col lg:mb-[-46px]">
            <span className="font-display inline-block bg-black text-[72px] font-bold leading-none tracking-tight text-[#ff6723] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[120px]">
              HOW TO
            </span>
            <span className="font-display mt-6 inline-block bg-black text-[72px] font-bold leading-none tracking-tight text-[#ff6723] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[120px]">
              STYLE THEM
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <ul className="flex min-w-max">
            {CAROUSEL_IMAGES.map((imageSrc, index) => (
              <li
                key={imageSrc}
                className="relative h-[492px] w-[326px] shrink-0 overflow-hidden border border-black/15 bg-black/5 lg:h-[611px] lg:w-[405px]"
              >
                <Image
                  src={imageSrc}
                  alt={`How to style look ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 326px, 405px"
                  className="object-cover"
                />
                <button
                  type="button"
                  aria-label={`Open product detail for look ${index + 1}`}
                  className="absolute bottom-0 right-0 flex size-[70px] items-center justify-center bg-primary text-[52px] leading-none text-black"
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default StyleCarouselSection;

"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

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

const StyleCarouselSection = () => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <>
      <section className=" bg-primary">
        <div className="px-4 sm:px-8 lg:px-[70px]">
          <div className="relative z-10 mb-[-28px] inline-flex items-start flex-col lg:mb-[-46px]">
            <span className="font-display inline-block bg-black text-[72px] font-bold leading-none tracking-tight text-[#ff6723] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[120px]">
              HOW TO
            </span>
            <span className="font-display mt-6 inline-block bg-black text-[72px] font-bold leading-none tracking-tight text-[#ff6723] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[120px]">
              STYLE THEM
            </span>
          </div>
        </div>

        <div
          className="-mt-5 overflow-hidden pt-5 lg:-mt-6 lg:pt-6"
          ref={emblaRef}
        >
          <ul className="flex">
            {CAROUSEL_IMAGES.map((imageSrc, index) => (
              <li
                key={imageSrc}
                className="group relative h-[492px] w-[326px] shrink-0 cursor-pointer overflow-hidden outline-2 outline-black transition-all duration-500 ease-in-out motion-safe:hover:scale-[1.03] active:cursor-grabbing lg:h-[611px] lg:w-[405px] lg:outline-transparent lg:hover:z-10 lg:hover:outline-black"
              >
                <Image
                  src={imageSrc}
                  alt={`How to style look ${index + 1}`}
                  fill
                  quality={60}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(max-width: 1024px) 326px, 405px"
                  className="object-cover"
                />
                <button
                  type="button"
                  aria-label={`Open product detail for look ${index + 1}`}
                  className="absolute bottom-0 right-0 flex size-[70px] items-center justify-center bg-primary"
                >
                  <Image
                    src="/svg/plus_icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden="true"
                  />
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

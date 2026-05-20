import Image from "next/image";

import type { EmblaViewportRefType } from "embla-carousel-react";

type ColorChip = {
  skuId: number;
  index: number;
  label: string;
  isActive: boolean;
};

type ModalImageCarouselProps = {
  emblaRef: EmblaViewportRefType;
  skuImageUrls: string[];
  modelName: string;
  colorChips: ColorChip[];
  setSelectedSkuIndex: (index: number) => void;
};

export function ModalImageCarousel(props: ModalImageCarouselProps) {
  const { emblaRef, skuImageUrls, modelName, colorChips, setSelectedSkuIndex } = props;

  return (
    <div className="relative h-[335px] w-full shrink-0 overflow-hidden bg-white sm:h-[499px]">
      <div className="h-full" ref={emblaRef}>
        <ul className="flex h-full items-center">
          {skuImageUrls.map((url, idx) => (
            <li
              key={`${url}-${idx}`}
              className="relative h-[298px] shrink-0 grow-0 basis-[70%] cursor-pointer"
            >
              <Image
                src={url}
                alt={`${modelName} — image ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 78vw, 444px"
                className="object-contain px-3 mix-blend-multiply sm:px-10"
                priority={idx === 0}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center sm:bottom-12">
        <div
          className="flex max-w-full flex-wrap justify-center gap-x-1 gap-y-1 sm:scrollbar-none sm:flex-nowrap sm:gap-x-2 sm:overflow-x-auto sm:[&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Select color variant"
        >
          {colorChips.map((chip) => (
            <div
              key={chip.skuId}
              role="button"
              tabIndex={0}
              aria-pressed={chip.isActive}
              onClick={() => setSelectedSkuIndex(chip.index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedSkuIndex(chip.index);
                }
              }}
              className={`shrink-0 cursor-pointer rounded-full border border-black px-2 py-0.5 text-[12px] leading-tight font-medium tracking-wide uppercase transition-colors sm:px-3 sm:py-1 sm:text-sm sm:tracking-[0.5px] ${
                chip.isActive
                  ? "bg-black text-white"
                  : "bg-transparent text-black hover:bg-black hover:text-white"
              }`}
            >
              {chip.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

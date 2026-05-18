"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useProductDetail } from "@/app/contexts/product-detail-context";
import { getProductImageUrl, getSkuColorLabel, sortSkus } from "@/app/lib/product";
import { formatModalPrice } from "@/app/utils/format";

const ONLINE_STORE_BASE = "https://www.owndays.com/jp/ja/products";

const buildOnlineStoreUrl = (productCode: string, skuId: number) => `${ONLINE_STORE_BASE}/${productCode}?sku=${skuId}`;

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" className="h-7 w-7" aria-hidden="true">
    <path
      d="M24.745 27.23L13.615 16.0825L2.485 27.23L0 24.745L11.1475 13.615L0 2.485L2.485 0L13.615 11.1475L24.745 0.0175004L27.2125 2.485L16.0825 13.615L27.2125 24.745L24.745 27.23Z"
      fill="currentColor"
    />
  </svg>
);

const ProductDetailModal = () => {
  const { selectedProduct, initialSkuIndex, isOpen, closeModal } = useProductDetail();

  const [selectedSkuIndex, setSelectedSkuIndex] = useState(initialSkuIndex);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    containScroll: "trimSnaps",
  });
  const isFirstEmblaSync = useRef(true);

  useEffect(() => {
    setSelectedSkuIndex(initialSkuIndex);
  }, [initialSkuIndex, selectedProduct]);

  useEffect(() => {
    if (!emblaApi) return;
    if (isFirstEmblaSync.current) {
      isFirstEmblaSync.current = false;
      return;
    }
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [emblaApi, selectedSkuIndex, selectedProduct]);

  const sortedSkus = useMemo(() => (selectedProduct ? sortSkus(selectedProduct.skus) : []), [selectedProduct]);

  const selectedSku = useMemo(() => {
    if (!sortedSkus.length) return null;
    return sortedSkus[selectedSkuIndex] ?? sortedSkus[0] ?? null;
  }, [sortedSkus, selectedSkuIndex]);

  const skuImageUrls = useMemo(() => {
    if (!selectedSku) return [];
    return [...selectedSku.images].sort((a, b) => a.order - b.order).map((img) => getProductImageUrl(img.path));
  }, [selectedSku]);

  if (!selectedProduct || !selectedSku) {
    return null;
  }

  const frameType = selectedProduct.frame_types[0]?.code?.toUpperCase() ?? "—";
  const skuLabel = `${selectedProduct.product.code} ${selectedSku.code}`;
  const isOutOfStock = selectedProduct.selling_setting.in_stock === 0;
  const onlineStoreHref = buildOnlineStoreUrl(selectedProduct.product.code, selectedSku.id);

  return (
    <>
      <div
        onClick={closeModal}
        aria-hidden="true"
        className={`fixed inset-0 z-110 bg-black/40 ${
          isOpen ? "animate-overlay-in" : "pointer-events-none animate-overlay-out"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-labelledby="product-detail-title"
        className={`fixed z-120 flex flex-col overflow-hidden bg-black shadow-2xl
          inset-y-[2.5%] left-1/2 h-[95%] w-[90%] rounded-[10px]
          sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-[616px] sm:rounded-l-[20px] sm:rounded-r-none
          ${
            isOpen
              ? "animate-modal-in sm:animate-drawer-in"
              : "pointer-events-none animate-modal-out sm:animate-drawer-out"
          }
        `}
      >
        <h2
          id="product-detail-title"
          className="font-display absolute top-4 left-6 z-30 text-3xl font-bold uppercase tracking-tight text-primary sm:left-8 sm:text-[35px]"
        >
          {selectedProduct.product.model_name}
        </h2>

        <button
          type="button"
          onClick={closeModal}
          aria-label="Close product detail"
          className="absolute top-4 right-4 z-30 rounded-full p-2 text-primary"
        >
          <CloseIcon />
        </button>

        <div className="relative h-[335px] w-full shrink-0 overflow-hidden bg-white sm:h-[499px]">
          <div className="h-full" ref={emblaRef}>
            <ul className="flex h-full items-center">
              {skuImageUrls.map((url, idx) => (
                <li key={`${url}-${idx}`} className="relative h-[298px] shrink-0 grow-0 basis-[70%]">
                  <Image
                    src={url}
                    alt={`${selectedProduct.product.model_name} — image ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 78vw, 444px"
                    className="object-contain px-3 mix-blend-multiply sm:px-10"
                    priority={idx === 0}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-3 sm:bottom-12 sm:px-6">
            <div
              className="flex max-w-full flex-wrap justify-center gap-x-1 gap-y-1 sm:flex-nowrap sm:gap-x-2 sm:overflow-x-auto sm:scrollbar-none sm:[&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label="Select color variant"
            >
              {sortedSkus.map((sku, idx) => {
                const colorLabel = getSkuColorLabel(sku.colors);
                const isActive = idx === selectedSkuIndex;
                return (
                  <div
                    key={sku.id}
                    onClick={() => setSelectedSkuIndex(idx)}
                    className={`shrink-0 cursor-pointer rounded-full border border-black px-2 py-0.5 text-[10px] leading-tight font-medium uppercase tracking-wide transition-colors sm:px-3 sm:py-1 sm:text-base sm:tracking-[0.5px] ${
                      isActive ? "bg-black text-white" : "bg-transparent text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {colorLabel}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto bg-black px-6 py-8 text-white sm:px-15 sm:py-10 scrollbar-none [&::-webkit-scrollbar]:hidden">
          <div className="space-y-2 text-sm font-medium">
            <div className="flex">
              <p className="w-[100px]">P/No.</p>
              <p>{skuLabel}</p>
            </div>
            <div className="flex">
              <p className="w-[100px]">TYPE</p>
              <p>{frameType}</p>
            </div>
            <div className="flex">
              <p className="w-[100px]">PRICE</p>
              <p>{formatModalPrice(selectedProduct.selling_setting.price)}</p>
            </div>
          </div>

          <p className="text-sm leading-loose">{selectedProduct.localization.description}</p>

          <div className="flex flex-col items-center pt-2">
            {isOutOfStock ? (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="flex h-12 w-full max-w-[373px] cursor-not-allowed items-center justify-center rounded-full bg-[#d9d9d9] text-base font-semibold tracking-wide text-[#7a7a7a] sm:h-[54px]"
              >
                OUT OF STOCK
              </button>
            ) : (
              <a
                href={onlineStoreHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full max-w-[373px] items-center justify-center rounded-full bg-primary text-base font-semibold tracking-wide text-white transition-colors hover:bg-primary-hover sm:h-[54px]"
              >
                ONLINE STORE
              </a>
            )}
            <span className="mt-3 text-xs">OWNDAYSオンラインストアに移動します</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ProductDetailModal;

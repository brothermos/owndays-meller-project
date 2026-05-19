"use client";

import Image from "next/image";

import { useProductDetail } from "@/app/contexts/product-detail-context";
import { useProductDetailModal } from "@/app/hooks/useProductDetailModal";
import type { ProductItem } from "@/app/types/product.type";

type ProductDetailModalContentProps = {
  selectedProduct: ProductItem;
  initialSkuIndex: number;
  isOpen: boolean;
  closeModal: () => void;
};

const ProductDetailModalContent = (props: ProductDetailModalContentProps) => {
  const { selectedProduct, initialSkuIndex, isOpen, closeModal } = props;

  const {
    dialogRef,
    emblaRef,
    skuImageUrls,
    colorChips,
    frameType,
    skuLabel,
    isOutOfStock,
    formattedPrice,
    onlineStoreHref,
    modelName,
    description,
    selectedSku,
    selectSku,
  } = useProductDetailModal({ selectedProduct, initialSkuIndex, isOpen });

  if (!selectedSku) {
    return null;
  }

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
        ref={dialogRef}
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
          {modelName}
        </h2>

        <button
          type="button"
          onClick={closeModal}
          aria-label="Close product detail"
          className="absolute top-4 right-4 z-30 rounded-full p-2 text-primary"
        >
          <Image src="/svg/close_icon.svg" alt="" width={28} height={28} aria-hidden="true" />
        </button>

        <div className="relative h-[335px] w-full shrink-0 overflow-hidden bg-white sm:h-[499px]">
          <div className="h-full" ref={emblaRef}>
            <ul className="flex h-full items-center">
              {skuImageUrls.map((url, idx) => (
                <li key={`${url}-${idx}`} className="relative h-[298px] shrink-0 grow-0 basis-[70%] cursor-pointer">
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
              className="flex max-w-full flex-wrap justify-center gap-x-1 gap-y-1 sm:flex-nowrap sm:gap-x-2 sm:overflow-x-auto sm:scrollbar-none sm:[&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label="Select color variant"
            >
              {colorChips.map((chip) => (
                <div
                  key={chip.skuId}
                  onClick={() => selectSku(chip.index)}
                  className={`shrink-0 cursor-pointer rounded-full border border-black px-2 py-0.5 text-[10px] leading-tight font-medium uppercase tracking-wide transition-colors sm:px-3 sm:py-1 sm:text-sm sm:tracking-[0.5px] ${
                    chip.isActive ? "bg-black text-white" : "bg-transparent text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto bg-black px-6 py-8 text-white scrollbar-none sm:px-15 sm:py-10 [&::-webkit-scrollbar]:hidden">
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
              <p>{formattedPrice}</p>
            </div>
          </div>

          <p className="text-sm leading-loose">{description}</p>

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

const ProductDetailModal = () => {
  const { selectedProduct, initialSkuIndex, isOpen, closeModal } = useProductDetail();

  if (!selectedProduct) {
    return null;
  }

  return (
    <ProductDetailModalContent
      key={`${selectedProduct.product.id}-${initialSkuIndex}`}
      selectedProduct={selectedProduct}
      initialSkuIndex={initialSkuIndex}
      isOpen={isOpen}
      closeModal={closeModal}
    />
  );
};

export default ProductDetailModal;

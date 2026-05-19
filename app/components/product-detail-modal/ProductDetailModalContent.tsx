"use client";

import Image from "next/image";

import { ModalCta } from "@/app/components/product-detail-modal/ModalCta";
import { ModalImageCarousel } from "@/app/components/product-detail-modal/ModalImageCarousel";
import { ModalOverlay } from "@/app/components/product-detail-modal/ModalOverlay";
import { ModalProductInfo } from "@/app/components/product-detail-modal/ModalProductInfo";
import { useProductDetailModal } from "@/app/hooks/useProductDetailModal";
import type { ProductItem } from "@/app/types/product.type";

type ProductDetailModalContentProps = {
  selectedProduct: ProductItem;
  initialSkuIndex: number;
  isOpen: boolean;
  closeModal: () => void;
};

export function ProductDetailModalContent(props: ProductDetailModalContentProps) {
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
    setSelectedSkuIndex,
  } = useProductDetailModal({ selectedProduct, initialSkuIndex, isOpen });

  if (!selectedSku) {
    return null;
  }

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClose={closeModal} />

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

        <ModalImageCarousel
          emblaRef={emblaRef}
          skuImageUrls={skuImageUrls}
          modelName={modelName}
          colorChips={colorChips}
          setSelectedSkuIndex={setSelectedSkuIndex}
        />

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto bg-black px-6 py-8 text-white scrollbar-none sm:px-15 sm:py-10 [&::-webkit-scrollbar]:hidden">
          <ModalProductInfo
            skuLabel={skuLabel}
            frameType={frameType}
            formattedPrice={formattedPrice}
            description={description}
          />
          <ModalCta isOutOfStock={isOutOfStock} onlineStoreHref={onlineStoreHref} />
        </div>
      </aside>
    </>
  );
}

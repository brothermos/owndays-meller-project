"use client";

import Image from "next/image";

import type { ProductItem } from "@/app/types/product.type";

import { useProductDetailModal } from "@/app/hooks/useProductDetailModal";

import { ModalCta } from "@/app/components/product-detail-modal/ModalCta";
import { ModalImageCarousel } from "@/app/components/product-detail-modal/ModalImageCarousel";
import { ModalOverlay } from "@/app/components/product-detail-modal/ModalOverlay";
import { ModalProductInfo } from "@/app/components/product-detail-modal/ModalProductInfo";

type ProductDetailModalContentProps = {
  selectedProduct: ProductItem;
  initialSkuIndex: number;
  isOpen: boolean;
  closeModal: () => void;
};

export function ProductDetailModalContent(props: ProductDetailModalContentProps) {
  const { selectedProduct, initialSkuIndex, isOpen, closeModal } = props;

  const {
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
  } = useProductDetailModal({ selectedProduct, initialSkuIndex });

  if (!selectedSku) {
    return null;
  }

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClose={closeModal} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-labelledby="product-detail-title"
        className={`fixed inset-y-[2.5%] left-1/2 z-120 flex h-[95%] w-[90%] transform-gpu flex-col overflow-hidden rounded-[10px] bg-black shadow-2xl will-change-transform motion-reduce:animate-none motion-reduce:will-change-auto sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-[616px] sm:rounded-l-[20px] sm:rounded-r-none ${
          isOpen
            ? "animate-modal-in sm:animate-drawer-in"
            : "pointer-events-none animate-modal-out sm:animate-drawer-out"
        } `}
      >
        <h2
          id="product-detail-title"
          className="absolute top-4 left-6 z-30 font-display text-3xl font-bold tracking-tight text-primary uppercase sm:left-8 sm:text-[35px]"
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

        <div className="flex flex-1 scrollbar-none flex-col gap-5 overflow-y-auto bg-black px-6 py-8 text-white sm:px-15 sm:py-10 [&::-webkit-scrollbar]:hidden">
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

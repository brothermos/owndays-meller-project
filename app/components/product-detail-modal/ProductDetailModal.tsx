"use client";

import { PRODUCT_MODAL_EXIT_MS } from "@/app/constants/product-detail-modal";

import { useProductDetail } from "@/app/contexts/product-detail-context";

import { useAnimatedPresence } from "@/app/hooks/useAnimatedPresence";

import { ProductDetailModalContent } from "@/app/components/product-detail-modal/ProductDetailModalContent";

const ProductDetailModal = () => {
  const { selectedProduct, initialSkuIndex, isOpen, closeModal } = useProductDetail();

  const isMounted = useAnimatedPresence({
    isVisible: Boolean(isOpen && selectedProduct),
    exitDurationMs: PRODUCT_MODAL_EXIT_MS,
  });

  if (!selectedProduct || !isMounted) {
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

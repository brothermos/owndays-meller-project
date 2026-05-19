"use client";

import { ProductDetailModalContent } from "@/app/components/product-detail-modal/ProductDetailModalContent";
import { useProductDetail } from "@/app/contexts/product-detail-context";

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

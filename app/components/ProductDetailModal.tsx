"use client";

import { useEffect, useState } from "react";

import { ProductDetailModalContent } from "@/app/components/product-detail-modal/ProductDetailModalContent";
import { PRODUCT_MODAL_EXIT_MS } from "@/app/constants/product-detail-modal";
import { useProductDetail } from "@/app/contexts/product-detail-context";

const ProductDetailModal = () => {
  const { selectedProduct, initialSkuIndex, isOpen, closeModal } = useProductDetail();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen && selectedProduct) {
      setIsMounted(true);
    }
  }, [isOpen, selectedProduct]);

  useEffect(() => {
    if (isOpen || !isMounted) return;

    const exitTimer = window.setTimeout(() => {
      setIsMounted(false);
    }, PRODUCT_MODAL_EXIT_MS);

    return () => window.clearTimeout(exitTimer);
  }, [isOpen, isMounted]);

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

"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ProductItem } from "@/app/types/product.type";

import { useBodyScrollLock } from "@/app/hooks/useBodyScrollLock";

type OpenModal = (product: ProductItem, initialSkuIndex?: number) => void;

type ProductDetailContextValue = {
  selectedProduct: ProductItem | null;
  initialSkuIndex: number;
  isOpen: boolean;
  openModal: OpenModal;
  closeModal: () => void;
};

const ProductDetailContext = createContext<ProductDetailContextValue | null>(null);

export function ProductDetailProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [initialSkuIndex, setInitialSkuIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback<OpenModal>((product, skuIndex = 0) => {
    setSelectedProduct(product);
    setInitialSkuIndex(skuIndex);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  const value = useMemo<ProductDetailContextValue>(
    () => ({
      selectedProduct,
      initialSkuIndex,
      isOpen,
      openModal,
      closeModal,
    }),
    [selectedProduct, initialSkuIndex, isOpen, openModal, closeModal],
  );

  return <ProductDetailContext.Provider value={value}>{children}</ProductDetailContext.Provider>;
}

export function useProductDetail() {
  const ctx = useContext(ProductDetailContext);
  if (!ctx) {
    throw new Error("useProductDetail must be used within ProductDetailProvider");
  }
  return ctx;
}

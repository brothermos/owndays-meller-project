"use client";

import { useProductsQuery } from "@/app/services/product.service";

import AnimatedProductItem from "@/app/components/product-card/AnimatedProductItem";
import ProductCardSkeleton from "@/app/components/product-card/ProductCardSkeleton";

const PRODUCT_SKELETON_COUNT = 8;

const ProductSection = () => {
  const { data: products, isLoading, isError, isFetching, refetch } = useProductsQuery();

  const isEmpty = !isLoading && !isError && products?.length === 0;

  return (
    <section id="products" className="bg-primary pt-[80px] pb-[121px] lg:pt-[110px] lg:pb-[177px]">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="w-full px-5 sm:px-[50px] md:px-[70px]">
          {isLoading && (
            <ul
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
              aria-busy="true"
              aria-label="Loading products"
            >
              {Array.from({ length: PRODUCT_SKELETON_COUNT }, (_, index) => (
                <li key={index}>
                  <ProductCardSkeleton />
                </li>
              ))}
            </ul>
          )}

          {isError && (
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-lg font-semibold text-white">
                Unable to load products. Please try again.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="rounded-full border-2 border-white bg-transparent px-6 py-2 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isFetching ? "Retrying…" : "Try again"}
              </button>
            </div>
          )}

          {isEmpty && (
            <p className="text-center text-lg font-semibold text-white">
              No products available at the moment.
            </p>
          )}

          {products && products.length > 0 && (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <AnimatedProductItem key={product.product.id} product={product} index={index} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

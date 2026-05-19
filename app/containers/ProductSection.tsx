"use client";

import AnimatedProductItem from "@/app/components/AnimatedProductItem";
import ProductCardSkeleton from "@/app/components/ProductCardSkeleton";
import { useProductsQuery } from "@/app/services/product.service";

const PRODUCT_SKELETON_COUNT = 8;

const ProductSection = () => {
  const { data: products, isLoading, isError } = useProductsQuery();

  return (
    <section
      id="products"
      className="bg-primary pb-[121px] pt-[80px] lg:pb-[177px] lg:pt-[110px]"
    >
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
            <p className="text-center text-lg font-semibold text-white">
              Unable to load products. Please try again.
            </p>
          )}

          {products && products.length > 0 && (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <AnimatedProductItem
                  key={product.product.id}
                  product={product}
                  index={index}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

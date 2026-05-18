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
      className="bg-primary px-4 pt-[80px] sm:px-8 lg:px-[70px] lg:pt-[110px] lg:pb-[177px] pb-[121px]"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {isLoading && (
          <ul
            className="grid grid-cols-1 gap-[17px] lg:grid-cols-3"
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
          <ul className="grid grid-cols-1 gap-[17px] lg:grid-cols-3">
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
    </section>
  );
};

export default ProductSection;

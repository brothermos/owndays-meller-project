"use client";

import ProductCard from "@/app/components/ProductCard";
import ProductCardSkeleton, {
  PRODUCT_SKELETON_COUNT,
} from "@/app/components/ProductCardSkeleton";
import { useProductsQuery } from "@/app/services/product.service";

const ProductSection = () => {
  const { data: products, isLoading, isError } = useProductsQuery();

  return (
    <section id="products" className="bg-primary px-4 py-10 sm:px-8 lg:px-16 lg:py-14">
      <div className="mx-auto w-full max-w-[1440px]">
        {isLoading && (
          <ul
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
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
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {products.map((product) => (
              <li key={product.product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ProductSection;

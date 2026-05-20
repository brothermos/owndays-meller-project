"use client";

import type { ProductItem } from "@/app/types/product.type";

import { COLUMNS_LG, STAGGER_STEP_MS } from "@/app/constants/animated-product-item";

import { useInView } from "@/app/hooks/useInView";

import ProductCard from "@/app/components/ProductCard";

type AnimatedProductItemProps = {
  product: ProductItem;
  index: number;
};

const AnimatedProductItem = (props: AnimatedProductItemProps) => {
  const { product, index } = props;
  const { ref, isInView } = useInView<HTMLLIElement>();

  const delayMs = (index % COLUMNS_LG) * STAGGER_STEP_MS;

  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transform-gpu transition-[transform,opacity] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <ProductCard product={product} eagerImage={index < 3} />
    </li>
  );
};

export default AnimatedProductItem;

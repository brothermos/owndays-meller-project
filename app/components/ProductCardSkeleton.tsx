const SKELETON_BLOCK = "animate-pulse rounded bg-[#e8e8e8]";

const ProductCardSkeleton = () => {
  return (
    <article className="flex flex-col bg-white" aria-hidden>
      <div className={`aspect-4/3 w-full ${SKELETON_BLOCK} rounded-none`} />

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className={`h-6 w-28 sm:h-7 sm:w-32 ${SKELETON_BLOCK}`} />
            <div className={`h-3.5 w-36 sm:h-4 sm:w-40 ${SKELETON_BLOCK}`} />
          </div>

          <div className="flex shrink-0 gap-[3px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex size-[38px] items-center justify-center"
              >
                <div className={`size-[28px] rounded-full ${SKELETON_BLOCK}`} />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`ml-auto mt-auto h-6 w-28 sm:h-7 sm:w-32 ${SKELETON_BLOCK}`}
        />
      </div>
    </article>
  );
};

export default ProductCardSkeleton;

type ModalCtaProps = {
  isOutOfStock: boolean;
  onlineStoreHref: string;
};

export function ModalCta(props: ModalCtaProps) {
  const { isOutOfStock, onlineStoreHref } = props;

  return (
    <div className="flex flex-col items-center pt-2">
      {isOutOfStock ? (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="flex h-12 w-full max-w-[373px] cursor-not-allowed items-center justify-center rounded-full bg-[#d9d9d9] text-base font-semibold tracking-wide text-white sm:h-[54px]"
        >
          OUT OF STOCK
        </button>
      ) : (
        <a
          href={onlineStoreHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full max-w-[373px] items-center justify-center rounded-full bg-primary text-base font-semibold tracking-wide text-white transition-colors hover:bg-primary-hover sm:h-[54px]"
        >
          ONLINE STORE
        </a>
      )}
      <span className="mt-3 text-xs">OWNDAYSオンラインストアに移動します</span>
    </div>
  );
}

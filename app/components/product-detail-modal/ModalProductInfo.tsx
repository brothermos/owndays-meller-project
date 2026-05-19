type ModalProductInfoProps = {
  skuLabel: string;
  frameType: string;
  formattedPrice: string;
  description: string;
};

export function ModalProductInfo(props: ModalProductInfoProps) {
  const { skuLabel, frameType, formattedPrice, description } = props;

  return (
    <>
      <div className="space-y-2 text-sm font-medium">
        <div className="flex">
          <p className="w-[100px]">P/No.</p>
          <p>{skuLabel}</p>
        </div>
        <div className="flex">
          <p className="w-[100px]">TYPE</p>
          <p>{frameType}</p>
        </div>
        <div className="flex">
          <p className="w-[100px]">PRICE</p>
          <p>{formattedPrice}</p>
        </div>
      </div>

      <p className="text-sm leading-loose">{description}</p>
    </>
  );
}

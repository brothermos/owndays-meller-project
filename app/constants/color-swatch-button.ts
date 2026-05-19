export const SWATCH_BASE_CLASS =
  "size-7 rounded-full transition-[box-shadow,transform] duration-150 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

export const SWATCH_RING_CLASS = {
  selected: "ring-2 ring-offset-[5px] ring-primary",
  default: "ring-1 ring-offset-0 ring-transparent hover:ring-gray-400",
} as const;

import { STYLE_CAROUSEL_SLIDES } from "@/app/constants/style-carousel";

export function getStyleCarouselSlideLabel(index: number) {
  const slide = STYLE_CAROUSEL_SLIDES[index];
  return slide ? `${slide.modelName} ${slide.colorLabel}` : `look ${index + 1}`;
}

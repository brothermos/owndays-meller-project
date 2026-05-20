const HERO_IMAGE_MOBILE = "/images/hero_banner_mobile.avif";
const HERO_IMAGE_DESKTOP = "/images/hero_banner_desktop.avif";

const HeroSection = () => {
  return (
    <section id="about" className="relative aspect-39/67 sm:aspect-1440/633">
      <picture className="absolute inset-0 block size-full">
        <source media="(max-width: 640px)" srcSet={HERO_IMAGE_MOBILE} type="image/avif" />
        <source media="(min-width: 641px)" srcSet={HERO_IMAGE_DESKTOP} type="image/avif" />
        <img
          src={HERO_IMAGE_DESKTOP}
          alt="OWNDAYS x MELLER hero banner"
          fetchPriority="high"
          decoding="sync"
          className="size-full object-cover"
        />
      </picture>

      <div className="relative z-10 flex h-full items-center justify-center py-20 sm:py-28">
        <h1 className="m-0 inline-block bg-black font-display text-[70px] leading-none font-bold tracking-tight text-primary [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-[80px] lg:text-[110px]">
          PRODUCTS
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;

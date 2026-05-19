import Image from "next/image";

const HERO_IMAGE_MOBILE = "/images/hero_banner_mobile.avif";
const HERO_IMAGE_DESKTOP = "/images/hero_banner_desktop.avif";

const HeroSection = () => {
  return (
    <section
      id="about"
      className="relative aspect-39/67 sm:aspect-1440/633"
    >
      <picture className="absolute inset-0 block size-full">
        <source srcSet={HERO_IMAGE_MOBILE} media="(max-width: 640px)" />
        <source srcSet={HERO_IMAGE_DESKTOP} media="(min-width: 641px)" />
        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="OWNDAYS x MELLER hero banner"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </picture>

      <div className="relative z-10 flex h-full items-center justify-center py-20 sm:py-28">
        <h1 className="font-display m-0 inline-block bg-black text-[70px] font-bold leading-none tracking-tight text-primary [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-[80px] lg:text-[110px]">
          PRODUCTS
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;

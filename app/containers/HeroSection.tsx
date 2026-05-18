"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative text-white">
      <div className="relative mx-auto h-[677px] w-full overflow-hidden lg:h-[633px]">
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/images/hero_banner_desktop.avif"
            alt="OWNDAYS x MELLER hero banner"
            fill
            priority
            sizes="(max-width: 1023px) 0px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/images/hero_banner_mobile.avif"
            alt="OWNDAYS x MELLER hero banner"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 0px"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-5">
          <div className="font-display m-0 inline-block bg-black text-[56px] font-bold leading-none tracking-tight text-primary [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[110px]">
            PRODUCTS
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

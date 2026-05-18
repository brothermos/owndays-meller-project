"use client";

import { NAV_ITEMS } from "@/app/constants/navbar";
import useHeroSection from "@/app/hooks/useHeroSection";
import Image from "next/image";

const HeroSection = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeroSection();

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

        <div className="absolute w-full px-5 py-6 lg:px-16 lg:py-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="lg:hidden">
                <Image
                  src="/images/collab_logo_mobile.png"
                  alt="OWNDAYS x MELLER collaboration logo"
                  width={240}
                  height={16}
                  className="h-auto w-[180px]"
                />
              </div>
              <div className="hidden lg:block">
                <Image
                  src="/images/collab_logo_desktop.png"
                  alt="OWNDAYS x MELLER collaboration logo"
                  width={351}
                  height={52}
                  className="h-auto w-[351px]"
                />
              </div>
            </div>

            <div className="hidden items-center gap-10 text-xl font-semibold lg:flex">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="flex h-6 w-5 flex-col justify-between lg:hidden"
              aria-label="Open mobile menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="h-[2px] w-full bg-white" />
              <span className="h-[2px] w-full bg-white" />
              <span className="h-[2px] w-full bg-white" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-60 bg-[#1e1e1e] lg:hidden">
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <Image
                  src="/images/collab_logo_mobile.png"
                  alt="OWNDAYS x MELLER collaboration logo"
                  width={240}
                  height={16}
                  className="h-auto w-[180px]"
                />
                <button
                  type="button"
                  className="text-4xl leading-none"
                  aria-label="Close mobile menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ×
                </button>
              </div>

              <div className="mt-16 flex flex-col gap-7 text-3xl font-semibold">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center px-5">
          <div className="font-display m-0 inline-block bg-black text-[56px] font-bold leading-none tracking-tight text-[#ff6723] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:text-[110px]">
            PRODUCTS
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

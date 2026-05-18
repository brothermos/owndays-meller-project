"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/app/constants/navbar";
import useHeroSection from "@/app/hooks/useHeroSection";

const NAVBAR_CTA_CLASS =
  "w-fit border border-transparent px-2 py-1 transition-colors hover:border-black hover:bg-white hover:text-black!";

const NavbarSection = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeroSection();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-100 mx-auto px-4 py-4 transition-all duration-300 sm:px-8 lg:px-[70px] ${
          isScrolled ? "bg-black/20 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between text-white max-w-[1440px] w-full mx-auto">
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

          <nav className="hidden items-center gap-10 text-xl font-bold lg:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className={NAVBAR_CTA_CLASS}>
                {item.label}
              </a>
            ))}
          </nav>

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
      </header>

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
                className="text-4xl leading-none text-white"
                aria-label="Close mobile menu"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="mt-16 flex flex-col gap-7 text-3xl font-semibold text-white">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={NAVBAR_CTA_CLASS}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarSection;

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MOBILE_MENU_LEGAL_LINKS, NAV_ITEMS } from "@/app/constants/navbar";
import useHeroSection from "@/app/hooks/useHeroSection";

const NAVBAR_CTA_CLASS =
  "w-fit border border-transparent px-2 py-1 transition-colors hover:border-black hover:bg-white hover:text-black!";

const NavbarSection = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobileMenuMounted,
    isMobileMenuAnimating,
  } = useHeroSection();
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
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between text-white">
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

      {isMobileMenuMounted && (
        <div
          className={`fixed inset-0 z-110 flex flex-col p-4 backdrop-blur-md lg:hidden motion-reduce:backdrop-blur-none ${
            isMobileMenuAnimating
              ? "animate-overlay-in bg-black/40"
              : "pointer-events-none animate-overlay-out bg-black/40"
          }`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!isMobileMenuOpen}
          aria-label="Mobile navigation menu"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`flex h-full w-full flex-col rounded-[10px] bg-black motion-reduce:animate-none ${
              isMobileMenuAnimating
                ? "animate-mobile-menu-panel-in"
                : "pointer-events-none animate-mobile-menu-panel-out"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="ml-auto flex cursor-pointer pt-[15px] pr-[15px]"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/svg/close_icon.svg"
                alt=""
                width={42}
                height={42}
                aria-hidden="true"
              />
            </button>

            <div className="px-[40px] py-[23px]">
              <nav className="text-primary">
                <ul>
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label} className="mb-[25px]">
                      <a
                        href={item.href}
                        className="text-[18px] font-semibold leading-[20.09px] tracking-[0.7px]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav className="mt-[60px] text-primary">
                <ul>
                  {MOBILE_MENU_LEGAL_LINKS.map((item) => (
                    <li key={item.label} className="mb-[15px]">
                      <a
                        href={item.href}
                        className={`text-[11px] leading-[20px] tracking-[0.7px] ${
                          item.emphasis ? "font-semibold" : "font-medium"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarSection;

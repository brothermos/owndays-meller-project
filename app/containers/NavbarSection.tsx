"use client";

import Image from "next/image";
import { NAV_ITEMS } from "@/app/constants/navbar";
import useHeroSection from "@/app/hooks/useHeroSection";

const NavbarSection = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useHeroSection();

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-100 w-full px-5 py-6 lg:px-16 lg:py-10">
        <div className="flex items-center justify-between text-white">
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

          <nav className="hidden items-center gap-10 text-xl font-semibold lg:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href}>
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

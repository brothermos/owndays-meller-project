"use client";

import Image from "next/image";

import { NAVBAR_CTA_CLASS } from "@/app/constants/cta-classes";
import { NAV_ITEMS } from "@/app/constants/navigation";
import { useMobileMenu } from "@/app/hooks/useMobileMenu";
import { useNavbarScroll } from "@/app/hooks/useNavbarScroll";

import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const isScrolled = useNavbarScroll();
  const { isOpen, isMounted, setIsOpen } = useMobileMenu();

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-100 py-5 transition-all duration-300 lg:py-3 ${
          isScrolled ? "bg-black/20 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 text-white sm:px-8 lg:px-[70px]">
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

          <nav className="hidden items-center gap-[50px] text-[15px] font-bold uppercase tracking-[0.7px] lg:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className={NAVBAR_CTA_CLASS}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="lg:hidden"
            aria-label="Open mobile menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <Image
              src="/svg/hamburger_icon.svg"
              alt=""
              width={20}
              height={15}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        isMounted={isMounted}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Navbar;

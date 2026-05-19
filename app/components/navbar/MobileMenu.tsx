"use client";

import Image from "next/image";

import { MOBILE_MENU_LEGAL_LINKS, NAV_ITEMS } from "@/app/constants/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  isMounted: boolean;
  onClose: () => void;
};

const MobileMenu = (props: MobileMenuProps) => {
  const { isOpen, isMounted, onClose } = props;

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-110 flex flex-col bg-black/40 p-4 lg:hidden ${
        isOpen ? "animate-overlay-in" : "pointer-events-none animate-overlay-out"
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-label="Mobile navigation menu"
      onClick={onClose}
    >
      <div
        className={`flex h-full w-full flex-col rounded-[10px] bg-black motion-reduce:animate-none ${
          isOpen ? "animate-mobile-menu-panel-in" : "pointer-events-none animate-mobile-menu-panel-out"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="ml-auto flex cursor-pointer pt-[15px] pr-[15px] [-webkit-tap-highlight-color:transparent]"
          aria-label="Close menu"
          onClick={onClose}
        >
          <Image src="/svg/close_icon.svg" alt="" width={28} height={28} aria-hidden="true" />
        </button>

        <div className="px-[40px] py-[23px]">
          <nav className="text-primary">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="mb-[25px]">
                  <a
                    href={item.href}
                    className="text-[18px] font-semibold leading-[20.09px] tracking-[0.7px]"
                    onClick={onClose}
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
                    onClick={onClose}
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
  );
};

export default MobileMenu;

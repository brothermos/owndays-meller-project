"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/app/constants/navbar";

const LEGAL_LINKS = [
  { label: "CONTACT US", href: "#" },
  { label: "PRIVACY POLICY", href: "#" },
  { label: "TERMS OF USE", href: "#" },
  { label: "特定商取引法表示", href: "#" },
];

const FOOTER_INLINE_CTA_CLASS =
  "w-fit border border-transparent px-1 py-0.5 text-[#ff6723] transition-colors hover:border-black hover:bg-white hover:text-black!";

const OWNDAYS_LINK_CTA_CLASS =
  "group ml-8 mt-2 flex items-center gap-2 border border-transparent px-2 py-1 text-[21px] font-semibold tracking-wide text-[#ff6723] transition-colors hover:border-black hover:bg-white hover:text-black!";

const FooterSection = () => {
  return (
    <footer className="bg-black text-[#ff6723]">
      <div className="hidden lg:block">
        <div className="border-y border-[#ff6723]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-[64.7222%_35.2778%]">
            <div className="border-r border-[#ff6723] px-12 py-14">
              <nav className="flex flex-col gap-4 text-[18px] font-semibold tracking-wide">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={FOOTER_INLINE_CTA_CLASS}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <Link
                href="#"
                aria-label="Instagram"
                className="mt-16 inline-flex cursor-pointer px-1"
              >
                <Image
                  src="/svg/instagram_icon.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center px-12 py-14">
              <div className="flex items-center gap-2 px-2 py-1 text-[#ff6723]">
                <Image
                  src="/svg/cart_icon.svg"
                  alt=""
                  width={37}
                  height={37}
                  aria-hidden="true"
                />
                <span className=" text-[21px] font-semibold tracking-wide">
                  ONLINE STORE
                </span>
              </div>
              <Link
                href="https://www.owndays.com"
                className={OWNDAYS_LINK_CTA_CLASS}
              >
                <span className="text-[14px]">OWNDAYS.COM</span>
                <Image
                  src="/svg/copy_icon.svg"
                  alt=""
                  width={17}
                  height={15}
                  className="transition group-hover:brightness-0"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-[#ff6723]">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-12 py-6 text-sm font-semibold tracking-wide">
            <div className="flex items-center gap-8">
              {LEGAL_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={FOOTER_INLINE_CTA_CLASS}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p>COPYRIGHT (C) OWNDAYS CO., LTD. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[720px] pb-8 lg:hidden">
        <div>
          <nav className="border-b-2 border-t-4 border-[#ff6723]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between border-b-2 border-[#ff6723] px-[30px] py-7 font-semibold tracking-wide text-[#ff6723] transition-colors hover:bg-white hover:text-black! last:border-b-0"
              >
                <span>{item.label}</span>
                <span className="leading-none">
                  <Image
                    src="/svg/right_icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden="true"
                  />
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between border-b border-[#ff6723] px-[30px] py-9 text-[#ff6723]">
            <div className="flex items-center gap-3">
              <Image
                src="/svg/cart_icon.svg"
                alt=""
                width={32}
                height={32}
                aria-hidden="true"
              />
              <span className="font-semibold tracking-wide">ONLINE STORE</span>
            </div>
            <Link
              href="https://www.owndays.com"
              className="group flex items-center gap-2 border border-transparent px-2 py-1 text-xs font-semibold tracking-wide text-[#ff6723] transition-colors hover:border-black hover:bg-white hover:text-black!"
            >
              <span>OWNDAYS.COM</span>
              <Image
                src="/svg/copy_icon.svg"
                alt=""
                width={17}
                height={15}
                className="transition group-hover:brightness-0"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="border-b border-[#ff6723] px-[30px] py-8">
            <div className="flex flex-col gap-3 font-semibold tracking-wide">
              {LEGAL_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={FOOTER_INLINE_CTA_CLASS}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="#"
              aria-label="Instagram"
              className="mt-10 inline-flex cursor-pointer"
            >
              <Image
                src="/svg/instagram_icon.svg"
                alt=""
                width={34}
                height={34}
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="px-[30px] flex justify-center pt-8 font-semibold tracking-wide text-[10px]">
            COPYRIGHT (C) OWNDAYS CO., LTD. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

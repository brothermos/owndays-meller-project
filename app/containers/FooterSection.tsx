"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_LEGAL_LINKS, NAV_ITEMS } from "@/app/constants/navbar";

const FOOTER_INLINE_CTA_CLASS =
  "w-fit border-2 border-transparent px-1 py-0.5 text-primary transition-colors hover:border-black hover:bg-white hover:text-black!";

const FOOTER_GROUP_CTA_CLASS =
  "group flex max-w-fit items-center border-2 border-transparent px-2 py-1 text-primary transition-colors hover:border-black hover:bg-white hover:text-black!";

const FOOTER_MOBILE_NAV_CLASS =
  "flex h-full w-full items-center justify-between text-primary transition-colors hover:border-black hover:bg-white hover:text-black!";

const INSTAGRAM_LINK_CLASS = "group inline-flex cursor-pointer";

const INSTAGRAM_ICON_CLASS =
  "transition-transform duration-300 ease-out motion-safe:group-hover:scale-110 motion-safe:group-active:scale-95";

const ONLINE_STORE_HREF = "https://www.owndays.com/jp/ja";

const INSTAGRAM_HREF = "https://www.instagram.com/meller";

const FooterSection = () => {
  return (
    <footer
      id="stores"
      className="scroll-mt-20 overflow-hidden bg-black text-primary md:scroll-mt-24"
    >
      <div className="md:border-t-2 md:border-primary md:grid md:grid-cols-[auto_318px] lg:grid-cols-[1fr_445px] xl:grid-cols-[1fr_508px]">
        <div className="md:col-span-2 md:border-r-2 md:border-primary md:p-[30px] md:[grid-area:1/1/3/2] lg:pt-[69px] lg:pl-[70px] lg:pb-[55px]">
          <ul className="border-t-4 border-primary md:border-t-0 md:grid md:gap-[11px] lg:gap-5">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="flex h-[60px] w-full items-center border-b-2 border-primary pl-[30px] pr-[19px] md:h-auto md:border-none md:px-0"
              >
                <a
                  href={item.href}
                  className={`${FOOTER_MOBILE_NAV_CLASS} border-2 border-transparent md:max-w-fit md:pt-[5px] md:pb-[2px] lg:pt-0 ${FOOTER_INLINE_CTA_CLASS}`}
                >
                  <span className="text-[14px] font-semibold leading-none tracking-[0.7px] lg:text-[18px]">
                    {item.label}
                  </span>
                  <span className="shrink-0 md:hidden">
                    <Image
                      src="/svg/right_icon.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="h-auto w-7"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-row items-center justify-between px-[30px] md:col-span-1 md:mx-auto md:min-h-0 md:flex-col md:justify-center md:gap-[17px] md:self-center md:px-0 md:[grid-area:1/2/4/3]">
          <Link
            href={ONLINE_STORE_HREF}
            className={`${FOOTER_GROUP_CTA_CLASS} items-center gap-1 py-10 md:gap-[9px] md:py-0 lg:gap-[9px] lg:text-[21px] lg:font-semibold lg:tracking-wide`}
          >
            <Image
              src="/svg/cart_icon.svg"
              alt=""
              width={24}
              height={24}
              className="transition group-hover:brightness-0 lg:h-9 lg:w-9"
              aria-hidden="true"
            />
            <span className="text-[14px] font-semibold leading-none tracking-[0.7px] md:text-base lg:text-[21px]">
              ONLINE STORE
            </span>
          </Link>
          <Link
            href="https://www.owndays.com"
            className={`${FOOTER_GROUP_CTA_CLASS} items-center gap-1.5 py-10 text-[11px] font-semibold leading-[20px] tracking-[0.7px] md:py-0 md:text-[14px] lg:mx-auto`}
          >
            <span>OWNDAYS.COM</span>
            <Image
              src="/svg/copy_icon.svg"
              alt=""
              width={14}
              height={12}
              className="transition group-hover:brightness-0 lg:h-[15px] lg:w-[17px]"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="border-t-2 border-primary md:col-span-2 md:[grid-area:4/1/5/2]">
          <ul className="px-[30px] py-[30px] md:grid md:grid-cols-[auto_auto_auto_1fr] md:gap-[10px] lg:gap-5 lg:pl-[70px]">
            {FOOTER_LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`${FOOTER_INLINE_CTA_CLASS} text-[11px] leading-none tracking-[0.7px] lg:text-[13px] ${
                    item.emphasis
                      ? "font-semibold"
                      : "font-medium lg:font-semibold xl:font-semibold"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 md:border-r-2 md:border-primary md:[grid-area:3/1/4/2]">
          <ul className="flex gap-[18px] px-[30px] pb-[30px] lg:pl-[70px] lg:pb-[69px]">
            <li>
              <a
                href={INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`${INSTAGRAM_LINK_CLASS} px-1`}
              >
                <Image
                  src="/svg/instagram_icon.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={`${INSTAGRAM_ICON_CLASS} lg:h-6 lg:w-6`}
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t-2 border-primary md:col-span-2 md:[grid-area:4/2/5/3]">
          <p className="px-8 py-[30px] text-center text-[10px] font-semibold leading-normal tracking-[0.7px] md:pt-[34px] md:pb-[26px] md:text-left lg:whitespace-nowrap lg:pl-[61px] lg:text-xs">
            COPYRIGHT (C) OWNDAYS CO., LTD. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

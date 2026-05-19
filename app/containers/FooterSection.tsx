"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_LEGAL_LINKS, NAV_ITEMS } from "@/app/constants/navbar";

const FOOTER_INLINE_CTA_CLASS =
  "w-fit border-2 border-transparent px-1 py-0.5 text-primary transition-colors hover:border-black hover:bg-white hover:text-black!";

const FOOTER_GROUP_CTA_CLASS =
  "group flex items-center gap-2 border-2 border-transparent px-2 py-1 text-primary transition-colors hover:border-black hover:bg-white hover:text-black!";

const FOOTER_MOBILE_NAV_CLASS =
  "flex items-center justify-between border-b-2 border-primary px-[30px] py-7 font-semibold tracking-wide text-primary transition-colors hover:bg-white hover:text-black! last:border-b-0";

const INSTAGRAM_LINK_CLASS = "group inline-flex cursor-pointer";

const INSTAGRAM_ICON_CLASS =
  "transition-transform duration-300 ease-out motion-safe:group-hover:scale-110 motion-safe:group-active:scale-95";

const ONLINE_STORE_CTA_CLASS = `${FOOTER_GROUP_CTA_CLASS} text-[21px] font-semibold tracking-wide`;

const OWNDAYS_LINK_CTA_CLASS = `${FOOTER_GROUP_CTA_CLASS} ml-8 mt-2 text-[21px] font-semibold tracking-wide`;

const ONLINE_STORE_HREF = "https://www.owndays.com/jp/ja";

const INSTAGRAM_HREF = "https://www.instagram.com/meller";

const FooterSection = () => {
  return (
    <footer
      id="stores"
      className="scroll-mt-20 bg-black text-primary lg:scroll-mt-24"
    >
      <div className="hidden lg:block">
        <div className="border-y-2 border-primary">
          <div className="mx-auto grid max-w-[1440px] grid-cols-[64.7222%_35.2778%]">
            <div className="border-r-2 border-primary px-12 py-14">
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
              <a
                href={INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`${INSTAGRAM_LINK_CLASS} mt-16 px-1`}
              >
                <Image
                  src="/svg/instagram_icon.svg"
                  alt=""
                  width={24}
                  height={24}
                  className={INSTAGRAM_ICON_CLASS}
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="flex flex-col items-center justify-center px-12 py-14">
              <Link href={ONLINE_STORE_HREF} className={ONLINE_STORE_CTA_CLASS}>
                <Image
                  src="/svg/cart_icon.svg"
                  alt=""
                  width={37}
                  height={37}
                  className="transition group-hover:brightness-0"
                  aria-hidden="true"
                />
                <span>ONLINE STORE</span>
              </Link>
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

        <div className="border-b-2 border-primary">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-12 py-6 text-sm font-semibold tracking-wide">
            <div className="flex items-center gap-8">
              {FOOTER_LEGAL_LINKS.map((item) => (
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
          <nav className="border-b-2 border-t-4 border-primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={FOOTER_MOBILE_NAV_CLASS}
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
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-between border-b-2 border-primary px-[30px] py-9 text-primary">
            <Link href={ONLINE_STORE_HREF} className={FOOTER_GROUP_CTA_CLASS}>
              <Image
                src="/svg/cart_icon.svg"
                alt=""
                width={32}
                height={32}
                className="transition group-hover:brightness-0"
                aria-hidden="true"
              />
              <span className="font-semibold tracking-wide">ONLINE STORE</span>
            </Link>
            <Link
              href="https://www.owndays.com"
              className={`${FOOTER_GROUP_CTA_CLASS} text-xs font-semibold tracking-wide`}
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

          <div className="border-b-2 border-primary px-[30px] py-8">
            <div className="flex flex-col gap-3 font-semibold tracking-wide">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={FOOTER_INLINE_CTA_CLASS}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <a
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`${INSTAGRAM_LINK_CLASS} mt-10`}
            >
              <Image
                src="/svg/instagram_icon.svg"
                alt=""
                width={34}
                height={34}
                className={INSTAGRAM_ICON_CLASS}
                aria-hidden="true"
              />
            </a>
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

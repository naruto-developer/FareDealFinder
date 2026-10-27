"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { contactDetails } from "@/lib/contactDetails";

const navigation = [
  { href: "/flight-services", label: "Our journeys" },
  { href: "/destinations", label: "Destinations" },
  { href: "/airlines", label: "Airlines" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about-us", label: "About us" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <a
        href={contactDetails.phoneHref}
        className="hidden min-h-11 items-center justify-center gap-2 bg-[#0c2925] px-4 py-3 text-[13px] font-bold text-[#f4f0e4] max-[600px]:flex"
        aria-label={`Call us at ${contactDetails.phone}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0 text-[#dfc89d]">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.55 3.6.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.55 3.6a1 1 0 0 1-.24 1l-2.2 2.2Z" />
        </svg>
        <span>Call Us: {contactDetails.phone.replace(/[()]/g, "").replaceAll(" ", "-")}</span>
      </a>
      <div className="travel-container flex min-h-[88px] items-center justify-between gap-7 max-[850px]:min-h-[70px] max-[850px]:gap-3 max-[850px]:py-2 max-[600px]:w-[95%] max-[600px]:gap-1.5">
        <Link
          className="block w-[194px] shrink-0 [&_img]:block [&_img]:h-auto [&_img]:w-full max-[1100px]:w-[165px] max-[600px]:w-[135px] max-[360px]:w-[110px]"
          href="/"
          aria-label="FareDealFinder home"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/faredealfinder-logo.png"
            alt="FareDealFinder"
            width={760}
            height={160}
            preload
          />
        </Link>
        <a
          className="max-[600px]:hidden order-2 flex min-h-11 shrink-0 items-center gap-2.5 border-l border-[#dedfd7] pl-6 max-[1100px]:pl-3 max-[850px]:ml-auto max-[850px]:border-0 max-[850px]:pl-0 max-[600px]:gap-1 max-[600px]:rounded-md max-[600px]:bg-teal-50 max-[600px]:px-2"
          href={contactDetails.phoneHref}
          aria-label={`Call a travel specialist at ${contactDetails.phone}`}
        >
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full border border-[#d9ded5] text-brand [&_svg]:size-[17px] max-[1100px]:hidden max-[850px]:grid max-[600px]:size-4 max-[600px]:border-0 max-[600px]:[&_svg]:size-3.5"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 3 3 5-2 2c1.4 2.6 3.4 4.6 6 6l2-2 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z" />
            </svg>
          </span>
          <span className="block whitespace-nowrap [&_small]:mb-1 [&_small]:block [&_small]:text-[9px] [&_small]:text-muted [&_strong]:text-sm [&_strong]:font-semibold [&_strong]:text-[#173e39] max-[1100px]:[&_small]:hidden max-[600px]:[&_strong]:text-[11px]">
            <small>Your journey starts with a conversation</small>
            <strong>{contactDetails.phone}</strong>
          </span>
        </a>
        <button
          className="header-menu-toggle max-[850px]:order-3! max-[600px]:w-9!"
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="m6 6 12 12M6 18 18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <nav
          id={menuId}
          className="header-nav max-[600px]:max-h-[calc(100dvh-114px)]!"
          data-open={menuOpen}
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="header-mobile-contact"
            href="/contact-us"
            onClick={() => setMenuOpen(false)}
          >
            Manage your trip <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

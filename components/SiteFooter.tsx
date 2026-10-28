import Image from "next/image";
import Link from "next/link";
import { contactDetails } from "@/lib/contactDetails";
import { airlines } from "@/lib/airlines";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Our journeys", href: "/our-journeys" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about-us" },
  // { label: "Airlines", href: "/airlines" },
  { label: "Contact us", href: "/contact-us" },
  { label: "Plan a trip", href: "/#flight-search" },
];

const dealLinks = [
  { label: "Domestic flights", href: "/deals/domestic-flights" },
  { label: "International flights", href: "/deals/international-flights" },
  { label: "First class", href: "/deals/first-class-flights" },
  { label: "Business class", href: "/deals/business-class-flights" },
  { label: "One way", href: "/deals/one-way-flights" },
  { label: "Round trip", href: "/deals/round-trip-flights" },
  { label: "Last minute", href: "/deals/last-minute-flights" },
  { label: "Student flights", href: "/deals/student-flights" },
  { label: "Family holidays", href: "/deals/family-holiday-flights" },
  { label: "Holiday deals", href: "/deals/holiday-flight-deals" },
  { label: "Multi-city", href: "/deals/multi-city-flights" },
  { label: "Cheap flight deals", href: "/deals/cheap-flight-deals" },
];

const destinationLinks = [
  { label: "London", href: "/cheap-flights-to-london" },
  { label: "Paris", href: "/cheap-flights-to-paris" },
  { label: "Rome", href: "/cheap-flights-to-rome" },
  { label: "Dubai", href: "/cheap-flights-to-dubai" },
  { label: "Istanbul", href: "/cheap-flights-to-istanbul" },
  { label: "Tokyo", href: "/cheap-flights-to-tokyo" },
  { label: "New York City", href: "/cheap-flights-to-new-york-city" },
  { label: "Los Angeles", href: "/cheap-flights-to-los-angeles" },
];

const policyLinks = [
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cancellation & Refund", href: "/cancellation-refund" },
  { label: "Advertisement Disclosure", href: "/advertisement-disclosure" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function SiteFooter() {
  const groups = [
    { title: "Discover", links: companyLinks },
    { title: "Ways to fly", links: dealLinks.slice(0, 9) },
    {
      title: "Destinations",
      links: destinationLinks.map((link) => ({
        href: `/city${link.href}`,
        label: `Cheap Flights To ${link.label}`,
      })),
    },
    // {
    //   title: "Airlines",
    //   links: airlines.slice(0, 9).map((airline) => ({
    //     href: `/airlines/${airline.slug}`,
    //     label: `${airline.name} Flights`,
    //   })),
    // },
    { title: "Good to know", links: policyLinks },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-[#294c43] bg-[#0c2925] text-[#b6c9bc]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#d9bd83]/60 to-transparent"
      />
      <div className="mx-auto w-[89%] max-w-[1200px]">
        <div className="flex flex-col gap-8 border-b border-white/10 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div>
            <Link
              href="/"
              aria-label="FareDealFinder home"
              className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddc48f]"
            >
              <Image
                src="/faredealfinder-logo.png"
                alt="FareDealFinder"
                width={760}
                height={160}
                className="h-auto w-[200px] brightness-0 invert sm:w-[225px]"
              />
            </Link>
            <p className="mt-4 max-w-md font-serif text-[26px] leading-tight text-[#f4f0e4] sm:text-[32px]">
              Extraordinary places.
              <br />
              <span className="italic text-[#cbb789]">
                A more personal way to get there.
              </span>
            </p>
          </div>
          <div className="w-full rounded-2xl border border-[#ddc48f]/20 bg-white/[0.035] p-5 sm:p-6 lg:max-w-[390px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#cbb789]">
              Your next chapter starts here
            </p>
            <p className="mt-2 text-sm leading-6 text-[#b6c9bc]">
              Talk to a real person about your next journey.
            </p>
            <a
              href={contactDetails.phoneHref}
              className="group mt-4 flex min-h-12 items-center justify-between gap-3 rounded-lg bg-[#dfc89d] px-4 py-3 font-semibold text-[#143c34] transition hover:bg-[#eedab6]"
            >
              <span className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 shrink-0"
                >
                  <path d="m7 3 3 5-2 2c1.4 2.6 3.4 4.6 6 6l2-2 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z" />
                </svg>
                <span className="text-base sm:text-lg">
                  {contactDetails.phone}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-xl transition group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href={contactDetails.emailHref}
              className="mt-2 inline-flex min-h-11 items-center text-xs text-[#b6c9bc] underline-offset-4 transition hover:text-white hover:underline"
            >
              {contactDetails.email}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-6 py-7 sm:gap-x-10 sm:gap-y-9 sm:py-12 md:grid-cols-3 lg:grid-cols-[0.8fr_1fr_1.25fr_1.2fr_1fr] lg:gap-x-8">
          {groups.map((group) => (
            <nav
              key={group.title}
              aria-label={`${group.title} footer links`}
              className="min-w-0 last:col-span-2 md:last:col-span-1"
            >
              <h2 className="mb-2 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ece5d1] sm:mb-4">
                <span aria-hidden="true" className="h-px w-4 bg-[#c4a771]" />
                {group.title}
              </h2>
              <ul className="space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex min-h-8 items-center gap-2 py-1 text-xs leading-5 text-[#afc3b5] transition-colors hover:text-[#f0d7a7] sm:min-h-10 sm:py-2"
                    >
                      <span className="min-w-0 break-words">{link.label}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[#cbb789] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="grid gap-5 rounded-xl border border-white/8 bg-white/[0.025] px-5 py-5 sm:px-6 md:grid-cols-[1fr_1.5fr] md:gap-8">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#c6b78e]">
              The people behind your journey
            </p>
            <p className="mt-2 text-xs leading-6 text-[#c0d0c1]">
              Operated by {contactDetails.companyName}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#c6b78e]">
              Our address
            </p>
            <p className="mt-2 max-w-md text-xs leading-6 text-[#b1c5b6]">
              {contactDetails.address}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/10 pt-6 pb-7 text-[11px] leading-6 text-[#95af9e] sm:mt-9 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div>
            <p>
              © {new Date().getFullYear()} FareDealFinder. All rights reserved.
            </p>
            <p className="mt-1 text-[10px] text-[#91a99a]">
              Disclaimer: FareDealFinder.com is an independent travel agent and
              is not affiliated with any airline, OTA, or third-party travel
              provider. All fares are sourced from third parties and are
              dynamic, subject to change, and not guaranteed until actual
              booking and confirmation. Final prices and availability should be
              verified at the time of booking.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex min-h-11 shrink-0 items-center gap-3 self-start rounded-full border border-white/15 px-4 text-[11px] text-[#dfc99f] transition hover:border-[#cbb789]/50 hover:bg-white/5"
          >
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

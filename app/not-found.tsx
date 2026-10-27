import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { contactDetails } from "@/lib/contactDetails";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden bg-[#f8f7f3] px-6 py-20 text-center sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[38rem] -translate-x-1/2 rounded-full border border-[#d9bd83]/25 bg-[#e8ede6]/40"
        />
        <div className="mx-auto max-w-2xl">
          <p className="travel-eyebrow">A little detour</p>
          <p aria-hidden="true" className="mt-4 font-serif text-[clamp(7rem,24vw,12rem)] leading-none tracking-tight text-[#177c79]">
            404
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-[#173e39] sm:text-5xl">
            This page is off the map.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted sm:text-base">
            We couldn’t find the page you’re looking for. It may have moved,
            or the link may be incorrect. Let’s get your journey back on track.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/" className="travel-button dark">
              Back to home <span aria-hidden="true">→</span>
            </Link>
            <Link href="/#flight-search" className="travel-button gold">
              Plan your journey <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <nav aria-label="Explore FareDealFinder" className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-brand">
            <Link href="/our-journeys" className="underline-offset-4 hover:underline">Our journeys</Link>
            <Link href="/destinations" className="underline-offset-4 hover:underline">Destinations</Link>
            <Link href="/contact-us" className="underline-offset-4 hover:underline">Contact us</Link>
          </nav>
          <p className="mt-9 text-sm leading-6 text-muted">
            Prefer a real conversation?{" "}
            <a href={contactDetails.phoneHref} className="whitespace-nowrap font-semibold text-brand underline underline-offset-4">
              {contactDetails.phone}
            </a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

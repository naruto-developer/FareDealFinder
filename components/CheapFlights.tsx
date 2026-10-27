import type { ReactNode } from "react";
import { contactDetails } from "@/lib/contactDetails";
import { cities } from "@/lib/sitePages";
import Link from "next/link";

export default function CheapFlights({ city, afterHero }: { city: string; afterHero?: ReactNode }) {
  return (
    <>
      <section className="editorial-hero relative isolate flex min-h-[22.1875rem] items-center overflow-hidden bg-[#263c3d] text-white max-[43.75rem]:min-h-85">
        <div
          className="absolute inset-0 -z-2 bg-[url('/hero-plane.jpg')] bg-cover bg-position-[center_47%] bg-no-repeat"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-1 bg-[linear-gradient(90deg,rgb(12_34_37/89%),rgb(12_34_37/46%)_78%)]"
          aria-hidden="true"
        />
        <div className="mx-auto w-[min(70rem,86%)] pt-[3.375rem] pb-15 [&>h1]:my-[0.8125rem] [&>h1]:max-w-200 [&>h1]:font-serif [&>h1]:text-[clamp(2.6125rem,5.5vw,4.4rem)] [&>h1]:font-normal [&>h1]:leading-[1.04] [&>p:first-of-type]:text-[#f3aa8e] [&>p:last-of-type]:m-0 [&>p:last-of-type]:max-w-160 [&>p:last-of-type]:text-[0.9625rem] [&>p:last-of-type]:leading-[1.8] [&>p:last-of-type]:text-white/81 max-[43.75rem]:w-[88%] max-[43.75rem]:py-[2.625rem] max-[43.75rem]:[&>h1]:text-[2.81875rem]">
          <nav
            className="mb-8 flex gap-2.5 text-[0.6875rem] text-white/72 [&>a]:text-[#f3aa8e]"
            aria-label="Breadcrumb"
          >
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="city">City</Link>
            <span>/</span>
            <span>{city}</span>
          </nav>
          <p className="text-[0.6875rem] font-extrabold tracking-[0.1rem] text-brand">
            DOMESTIC DESTINATION · MCO
          </p>
          <h1>{city}</h1>
          <p>
            Compare flight schedules and arrival options for an Orlando {city}{" "}
            trip.
          </p>
          <Link
            className="mt-[1.375rem] inline-flex items-center gap-3.5 border-b border-white/50 pb-2 text-[0.75625rem] font-bold [&>span]:text-[#f3aa8e]"
            href="/#flight-search"
          >
            Tell us about your trip <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      {afterHero}
      <main className="editorial-main mx-auto w-[min(70rem,86%)] pt-18 pb-22 max-[43.75rem]:w-[88%] max-[43.75rem]:pt-13 max-[43.75rem]:pb-16">
        <div className="grid grid-cols-[minmax(0,1fr)_17.5rem] items-start gap-15 max-[43.75rem]:grid-cols-1 max-[43.75rem]:gap-[2.125rem]">
          <article className="max-w-180">
            <section className="not-first:mt-10 not-first:border-t not-first:border-line not-first:pt-[2.125rem] [&>h2]:mb-3.5 [&>h2]:font-serif [&>h2]:text-[1.85625rem] [&>h2]:font-normal [&>h2]:leading-[1.15] [&>p]:mb-[0.8125rem] [&>p]:text-[0.89375rem] [&>p]:leading-[1.9] [&>p]:text-[#586866] [&>ul]:mt-[1.0625rem] [&>ul]:grid [&>ul]:gap-[0.5625rem] [&>ul]:pl-[1.1875rem] [&_li]:text-[0.89375rem] [&_li]:leading-[1.9] [&_li]:text-[#586866] [&_li]:marker:text-brand">
              <h2>
                Planning a trip to {city?.replace("Cheap Flights To", "")}
              </h2>

              <p>
                Start with the schedule and arrival time you need. Available
                routes, connections and fares vary with your departure city and
                travel dates.
              </p>
              <p>
                Use the trip request on our homepage to organize your route
                details, then call our team to discuss current options for{" "}
                {city?.replace("Cheap Flights To", "")}
              </p>
            </section>
            <section className="not-first:mt-10 not-first:border-t not-first:border-line not-first:pt-[2.125rem] [&>h2]:mb-3.5 [&>h2]:font-serif [&>h2]:text-[1.85625rem] [&>h2]:font-normal [&>h2]:leading-[1.15] [&>p]:mb-[0.8125rem] [&>p]:text-[0.89375rem] [&>p]:leading-[1.9] [&>p]:text-[#586866] [&>ul]:mt-[1.0625rem] [&>ul]:grid [&>ul]:gap-[0.5625rem] [&>ul]:pl-[1.1875rem] [&_li]:text-[0.89375rem] [&_li]:leading-[1.9] [&_li]:text-[#586866] [&_li]:marker:text-brand">
              <h2>Review the complete journey</h2>

              <p>
                Schedules, fares and routing depend on your departure point,
                travel dates and the operating airline. A flight request on this
                site is not a live search or a confirmed reservation. Review
                current itinerary and price details with the booking provider
                before deciding.
              </p>

              <ul>
                <li>Compare connection airports and total journey time.</li>
                <li>
                  Check whether each layover and airport transfer works for your
                  plans.
                </li>
                <li>
                  Review baggage, change and cancellation rules for the specific
                  fare.
                </li>
                <li>
                  Confirm current entry requirements with official sources.
                </li>
              </ul>
            </section>
          </article>
          <aside className="border-t-3 border-coral bg-[#e8ede6] p-[1.5625rem] [&>p:first-of-type]:mb-4 [&>p:first-of-type]:text-[0.55rem] [&>p:last-of-type]:text-[0.75625rem] [&>p:last-of-type]:leading-[1.8] [&>p:last-of-type]:text-[#667572] [&>h2]:mb-3.5 [&>h2]:font-serif [&>h2]:text-[1.71875rem] [&>h2]:font-normal [&>h2]:leading-[1.15] [&>a:first-of-type]:mt-5 [&>a:first-of-type]:flex [&>a:first-of-type]:justify-between [&>a:first-of-type]:border-b [&>a:first-of-type]:border-[#becbc1] [&>a:first-of-type]:py-3 [&>a:first-of-type]:text-[0.75625rem] [&>a:first-of-type]:font-extrabold [&>a:first-of-type]:text-brand">
            <p className="text-[0.6875rem] font-extrabold tracking-[0.1rem] text-brand">
              A GOOD PLACE TO START
            </p>
            <h2>Have a route in mind?</h2>
            <p>
              Organize your route and dates, then call our team to discuss
              current options. The form does not search live fares or submit a
              booking.
            </p>
            <Link href="/#flight-search">
              Start a trip request <span aria-hidden="true">↗</span>
            </Link>
            <a
              className="mt-5 flex justify-between pt-3 text-[0.75625rem] font-extrabold text-ink"
              href={contactDetails.phoneHref}
            >
              Call {contactDetails.phone}
            </a>
          </aside>
        </div>

        <section className="mt-[4.625rem] border-t border-line pt-[1.6875rem] max-[43.75rem]:mt-[3.375rem]">
          <div className="flex items-center justify-between text-[0.61875rem] font-extrabold tracking-[0.1rem] text-[#82908d] [&>a]:text-[0.6875rem] [&>a]:tracking-normal [&>a]:text-brand [&>a>span]:ml-2 [&>a>span]:text-[1.03125rem]">
            <span>KEEP EXPLORING </span>
            <Link href="/#flight-search">
              Tell us about your trip <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="[&+div]:mt-[2.125rem] [&>h2]:m-0 [&>h2]:font-serif [&>h2]:text-[1.5125rem] [&>h2]:font-normal">
            <h2>Explore more</h2>
            <div className="mt-3 grid grid-cols-3 gap-x-[1.375rem] max-[43.75rem]:grid-cols-2 max-[43.75rem]:gap-x-3.5">
              {cities.map((item) => (
                <Link
                  className="grid min-h-19 grid-cols-[1fr_auto] content-center gap-x-2.5 gap-y-1 border-b border-line [&>span]:text-[0.825rem] [&>span]:font-extrabold [&>small]:col-start-1 [&>small]:text-[0.61875rem] [&>small]:leading-[1.5] [&>small]:text-[#768480] [&>b]:col-start-2 [&>b]:row-span-2 [&>b]:row-start-1 [&>b]:self-center [&>b]:text-[1.03125rem] [&>b]:text-coral [&:hover>span]:text-brand"
                  href={`cheap-flights-to-${item.slug}`}
                  key={item.name}
                >
                  <span>{item.name}</span>
                  <small>{item.detail}</small>
                  <b aria-hidden="true">↗</b>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

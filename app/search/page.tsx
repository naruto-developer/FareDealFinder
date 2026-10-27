export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import CollapsibleFlightDetails from "@/components/search/CollapsibleFlightDetails";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contactDetails } from "@/lib/contactDetails";
import { getAirportByIata } from "@/lib/airports";
import MailForm from "@/components/mailForm";

type SearchValue = string | string[] | undefined;
type SearchPageProps = {
  searchParams: Promise<Record<string, SearchValue>>;
};
type TripType = "round-trip" | "one-way" | "multi-city";

function first(value: SearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

function isDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00.000Z`).toLocaleDateString("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
}

export const metadata: Metadata = {
  title: "Flight Search Results",
  description:
    "Review your flight search details and contact FareDealFinder for assistance.",
  robots: { index: false, follow: false },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchQuery = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => searchQuery.append(key, item));
    } else if (value) {
      searchQuery.append(key, value);
    }
  });

  const tripTypeValue = first(params.tripType);

  const tripType: TripType | null =
    tripTypeValue === "round-trip" ||
    tripTypeValue === "one-way" ||
    tripTypeValue === "multi-city"
      ? tripTypeValue
      : null;

  const fromCode = first(params.from)?.toUpperCase() ?? "";
  const toCode = first(params.to)?.toUpperCase() ?? "";
  const nextFromCode = first(params.nextFrom)?.toUpperCase() ?? "";
  const nextToCode = first(params.nextTo)?.toUpperCase() ?? "";
  const departure = first(params.departure) ?? "";
  const returnDate = first(params.returnDate) ?? "";
  const secondDeparture = first(params.secondDeparture) ?? "";
  const travelers = Number(first(params.travelers));
  const cabin = first(params.cabin) ?? "";

  const from = /^[A-Z0-9]{3}$/.test(fromCode)
    ? getAirportByIata(fromCode)
    : undefined;
  const to = /^[A-Z0-9]{3}$/.test(toCode)
    ? getAirportByIata(toCode)
    : undefined;
  const nextFrom = /^[A-Z0-9]{3}$/.test(nextFromCode)
    ? getAirportByIata(nextFromCode)
    : undefined;
  const nextTo = /^[A-Z0-9]{3}$/.test(nextToCode)
    ? getAirportByIata(nextToCode)
    : undefined;
  const cabins = ["Economy", "Premium economy", "Business", "First class"];
  const routeLabel =
    from && to
      ? `${from.city} (${from.iata}) to ${to.city} (${to.iata})`
      : "Select valid departure and arrival airports";

  const isValid = Boolean(
    tripType &&
    from &&
    to &&
    from.iata !== to.iata &&
    isDate(departure) &&
    Number.isInteger(travelers) &&
    travelers >= 1 &&
    travelers <= 9 &&
    cabins.includes(cabin) &&
    (tripType === "one-way" ||
      (tripType === "round-trip" &&
        isDate(returnDate) &&
        returnDate >= departure) ||
      (tripType === "multi-city" &&
        nextFrom &&
        nextTo &&
        nextFrom.iata !== nextTo.iata &&
        isDate(secondDeparture) &&
        secondDeparture >= departure)),
  );

  return (
    <>
      <SiteHeader />
      <main className="min-h-[65vh] bg-slate-50 px-4 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
                Flight search
              </p>
              <h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                {isValid ? "Flight results" : "Check your search"}
              </h1>
            </div>
            <Link
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30"
              href={`/?${searchQuery.toString()}#flight-search`}
            >
              Modify search
            </Link>
          </div>
          {isValid && from && to && tripType && (
            <section
              className="mt-6  rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
              aria-label="Flight search details"
            >
              <CollapsibleFlightDetails route={`${from.iata} to ${to.iata}`}>
                <div className="grid gap-3 pt-3 sm:grid-cols-2 sm:pt-0 lg:grid-cols-4">
                  <TripDetail label="Route" value={routeLabel} />
                  <TripDetail label="Trip type" value={tripTypeLabel(tripType)} />
                  <TripDetail label="Departure" value={formatDate(departure)} />
                  <TripDetail
                    label="Travelers · cabin"
                    value={`${travelers} ${travelers === 1 ? "traveler" : "travelers"} · ${cabin}`}
                  />
                  {tripType === "round-trip" && (
                    <TripDetail label="Return" value={formatDate(returnDate)} />
                  )}
                  {tripType === "multi-city" && nextFrom && nextTo && (
                    <>
                      <TripDetail
                        label="Next flight"
                        value={`${nextFrom.city} (${nextFrom.iata}) to ${nextTo.city} (${nextTo.iata})`}
                      />
                      <TripDetail
                        label="Next departure"
                        value={formatDate(secondDeparture)}
                      />
                    </>
                  )}
                </div>
              </CollapsibleFlightDetails>
              <MailForm
                search={{
                  tripType,
                  from: { ...from, code: from.iata },
                  to: { ...to, code: to.iata },
                  departureDate: departure,
                  returnDate: tripType === "round-trip" ? returnDate : "",
                  travelers,
                  cabin,
                  cabinLabel: cabin,
                  ...(tripType === "multi-city" && nextFrom && nextTo
                    ? {
                        nextFrom: { ...nextFrom, code: nextFrom.iata },
                        nextTo: { ...nextTo, code: nextTo.iata },
                        secondDeparture,
                      }
                    : {}),
                }}
              />
            </section>
          )}

          <section
            aria-labelledby="assistance-title"
            className="mt-6 rounded-2xl border border-[#294c43] bg-[#0c2925] p-5 text-[#f4f0e4] sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#dfc89d]">
                  A more personal way to travel
                </p>
                <h2 id="assistance-title" className="mt-2 font-serif text-2xl sm:text-3xl">
                  How flight assistance works
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#b6c9bc]">
                  {isValid
                    ? "Send your request using the form above, or call to discuss your journey with a flight specialist."
                    : "Update your route and travel dates using Modify search, or call us for help planning your journey."}
                </p>
              </div>
              <a
                href={contactDetails.phoneHref}
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-[#dfc89d] px-5 py-3 text-sm font-semibold text-[#143c34] transition hover:bg-[#eedab6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dfc89d]"
              >
                Call {contactDetails.phone}
              </a>
            </div>
            <ol className="mt-6 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-6">
              {[
                { title: "Share your plans", description: "Tell us your destination, dates, cabin preference and number of travelers." },
                { title: "Discuss the details", description: "Talk through your schedule, baggage needs and any flexible travel dates." },
                { title: "Review before booking", description: "Confirm the total price, availability and fare rules before making a decision." },
              ].map((step, index) => (
                <li key={step.title} className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#dfc89d]/30 text-xs font-semibold text-[#dfc89d]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-[#b6c9bc]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            Search details are carried in the URL so they can be reviewed. No
            fare, seat or booking is confirmed on this page.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function tripTypeLabel(tripType: TripType) {
  return tripType === "round-trip"
    ? "Round trip"
    : tripType === "one-way"
      ? "One way"
      : "Multi-city";
}

function TripDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-slate-200 pb-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 wrap-break-word text-sm font-semibold text-ink">
        {value}
      </dd>
    </div>
  );
}

import type { RelatedPage, SitePage } from "@/lib/sitePages";

export const airlines = [
  { name: "American Airlines", slug: "american-airlines" },
  { name: "Delta Air Lines", slug: "delta-air-lines" },
  { name: "United Airlines", slug: "united-airlines" },
  { name: "Southwest Airlines", slug: "southwest-airlines" },
  { name: "JetBlue Airways", slug: "jetblue-airways" },
  { name: "Alaska Airlines", slug: "alaska-airlines" },
  { name: "British Airways", slug: "british-airways" },
  { name: "Emirates", slug: "emirates" },
  { name: "Qatar Airways", slug: "qatar-airways" },
  { name: "Lufthansa", slug: "lufthansa" },
];

const airlineLinks: RelatedPage[] = airlines.map((airline) => ({
  title: airline.name,
  href: `/airlines/${airline.slug}`,
  detail: `Plan your trip with ${airline.name} and review itinerary and fare details.`,
}));

function createAirlinePage(airline: { name: string; slug: string }): SitePage {
  return {
  path: `/airlines/${airline.slug}`,
  title: `${airline.name} Flights`,
  eyebrow: "AIRLINE FLIGHT OPTIONS",
  description: `Explore ${airline.name} flight options for your travel dates and compare schedules, connections and fare conditions.`,
  sections: [
    {
      title: `Planning a trip with ${airline.name}`,
      paragraphs: [
        `Share your departure city, destination, travel dates and cabin preference to discuss ${airline.name} flight options with our team. Routes and availability depend on your itinerary and dates.`,
        "The trip form organizes your details for review. It does not search live fares, reserve seats or confirm a booking.",
      ],
    },
    {
      title: "Review your itinerary and ticket terms",
      paragraphs: [
        `Before choosing a ${airline.name} itinerary, confirm the operating carrier on every segment and the conditions of the specific ticket with the booking provider.`,
      ],
      bullets: [
        "Compare departure times, connection airports and total journey time.",
        "Check baggage allowances, seating options and any additional charges.",
        "Review change, cancellation and refund conditions before purchase.",
      ],
    },
    {
      title: "Independent flight assistance",
      paragraphs: [
        `FareDealFinder is an independent flight-assistance service. The ${airline.name} name identifies the carrier and does not imply sponsorship, endorsement or affiliation.`,
      ],
    },
  ],
  relatedGroups: [
    { title: "Explore airlines", links: airlineLinks.filter((link) => link.href !== `/airlines/${airline.slug}`) },
    { title: "Browse all airlines", links: [{ title: "All airlines", href: "/airlines", detail: "Browse airline flight-planning pages." }] },
  ],
  };
}

export const airlinePages: SitePage[] = airlines.map(createAirlinePage);

export function getAirlinePage(slug: string): SitePage {
  const airline = airlines.find((item) => item.slug === slug);
  const name = slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Airline";

  return createAirlinePage(airline ?? { name, slug });
}

export const airlinesIndexPage: SitePage = {
  path: "/airlines",
  title: "Explore airlines for your next trip.",
  eyebrow: "AIRLINE GUIDES",
  description: "Browse airline flight-planning pages and review schedules, connections and ticket conditions for your journey.",
  sections: [{
    title: "Choose an airline to start planning",
    paragraphs: ["Select an airline below to explore trip-planning details. Share your route and dates with our team to discuss current options. Availability and fares must be confirmed before booking."],
  }],
  relatedGroups: [{ title: "Airlines", links: airlineLinks }],
};

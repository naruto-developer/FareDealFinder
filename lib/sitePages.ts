import { airlinePages, airlinesIndexPage } from "@/lib/airlines";

export type PageSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type RelatedPage = { title: string; href: string; detail: string };
export type RelatedGroup = { title: string; links: RelatedPage[] };

export type SitePage = {
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  sections: PageSection[];
  related?: RelatedPage[];
  relatedGroups?: RelatedGroup[];
};

export const cities = [
  {
    name: "London",
    slug: "london",
    country: "United Kingdom",
    code: "LHR",
    region: "international",
    detail:
      "Compare transatlantic routes, connection schedules and arrival times for London.",
  },
  {
    name: "Paris",
    slug: "paris",
    country: "France",
    code: "CDG",
    region: "international",
    detail:
      "Compare international connections, journey length and fare conditions for Paris.",
  },
  {
    name: "Rome",
    slug: "rome",
    country: "Italy",
    code: "FCO",
    region: "international",
    detail:
      "Review route choices, connection time and arrival schedules for Rome.",
  },
  {
    name: "Dubai",
    slug: "dubai",
    country: "United Arab Emirates",
    code: "DXB",
    region: "international",
    detail:
      "Compare long-haul routes, connection airports and total travel time for Dubai.",
  },
  {
    name: "Istanbul",
    slug: "istanbul",
    country: "Turkey",
    code: "IST",
    region: "international",
    detail: "Review connection schedules and the full itinerary for Istanbul.",
  },
  {
    name: "Tokyo",
    slug: "tokyo",
    country: "Japan",
    code: "HND",
    region: "international",
    detail:
      "Compare long-haul routing, layovers and total journey time for Tokyo.",
  },
  {
    name: "New York City",
    slug: "new-york-city",
    country: "United States",
    code: "JFK",
    region: "domestic",
    detail:
      "Compare arrival airports, connection schedules and total travel time for New York.",
  },
  {
    name: "Los Angeles",
    slug: "los-angeles",
    country: "United States",
    code: "LAX",
    region: "domestic",
    detail:
      "Review arrival timing and the full route before planning your Los Angeles trip.",
  },
  {
    name: "Las Vegas",
    slug: "las-vegas",
    country: "United States",
    code: "LAS",
    region: "domestic",
    detail: "Compare schedules, connections and arrival timing for Las Vegas.",
  },
  {
    name: "San Francisco",
    slug: "san-francisco",
    country: "United States",
    code: "SFO",
    region: "domestic",
    detail:
      "Check the route, arrival time and connection details for San Francisco.",
  },
  {
    name: "Miami",
    slug: "miami",
    country: "United States",
    code: "MIA",
    region: "domestic",
    detail: "Review route options and schedules for your dates to Miami.",
  },
  {
    name: "Orlando",
    slug: "orlando",
    country: "United States",
    code: "MCO",
    region: "domestic",
    detail: "Compare flight schedules and arrival options for an Orlando trip.",
  },
];

const cityLinks: RelatedPage[] = cities.map((city) => ({
  title: city.name,
  href: `/city/cheap-flights-to-${city.slug}`,
  detail: `${city.country} · ${city.code} · ${city.detail}`,
}));

const destinationGroups: RelatedGroup[] = [
  {
    title: "International destinations",
    links: cityLinks.filter(
      (_, index) => cities[index].region === "international",
    ),
  },
  {
    title: "Domestic destinations",
    links: cityLinks.filter((_, index) => cities[index].region === "domestic"),
  },
];

const dealCategories = [
  {
    slug: "domestic-flights",
    title: "Domestic Flights",
    detail:
      "Compare schedules, connections and fare conditions for travel within the United States.",
    bullets: [
      "Review departure and arrival airports.",
      "Compare nonstop and connecting itineraries.",
      "Check baggage and change rules for the selected fare.",
    ],
  },
  {
    slug: "international-flights",
    title: "International Flights",
    detail:
      "Review long-haul routes, connection schedules and total travel time across international itineraries.",
    bullets: [
      "Compare connection cities and layover lengths.",
      "Check whether an itinerary changes airports.",
      "Verify entry requirements with official sources.",
    ],
  },
  {
    slug: "first-class-flights",
    title: "First Class Flights",
    detail:
      "Compare first-class schedules, routing, cabin details and fare conditions for your trip.",
    bullets: [
      "Confirm the cabin on every flight segment.",
      "Review schedule and connection preferences.",
      "Check change and cancellation conditions.",
    ],
  },
  {
    slug: "business-class-flights",
    title: "Business Class Flights",
    detail:
      "Review business-class routes and schedules alongside connection and fare details.",
    bullets: [
      "Compare departure and arrival windows.",
      "Check cabin availability on each segment.",
      "Review fare flexibility before booking.",
    ],
  },
  {
    slug: "one-way-flights",
    title: "One Way Flights",
    detail:
      "Plan a one-way itinerary around your departure date, arrival time and route preferences.",
    bullets: [
      "Share your destination and preferred travel date.",
      "Compare connections and total journey time.",
      "Confirm the final fare and ticket terms before purchase.",
    ],
  },
  {
    slug: "round-trip-flights",
    title: "Round Trip Flights",
    detail:
      "Review outbound and return schedules together to see how the complete journey fits.",
    bullets: [
      "Share both travel dates and any timing needs.",
      "Compare connection details on each direction.",
      "Check whether the fare rules apply to both segments.",
    ],
  },
  {
    slug: "last-minute-flights",
    title: "Last Minute Flights",
    detail:
      "For travel coming up soon, share your travel window and any arrival deadline for a schedule review.",
    bullets: [
      "Provide the date you need to leave.",
      "Mention any arrival deadline or schedule limits.",
      "Availability and prices can change as departure approaches.",
    ],
  },
  {
    slug: "student-flights",
    title: "Student Flights",
    detail:
      "Review routes and fare conditions for student travel; eligibility and any special terms depend on the airline and ticket.",
    bullets: [
      "Share your dates and destination early.",
      "Ask whether the specific fare has eligibility requirements.",
      "Confirm baggage, change and documentation rules with the provider.",
    ],
  },
  {
    slug: "family-holiday-flights",
    title: "Family Holiday Flights",
    detail:
      "Plan family travel by reviewing schedules, connections and the needs of everyone on the itinerary.",
    bullets: [
      "Include every traveler in the trip details.",
      "Compare connection time and arrival schedules.",
      "Check seating, baggage and child-travel rules with the airline.",
    ],
  },
  {
    slug: "holiday-flight-deals",
    title: "Holiday Flight Deals",
    detail:
      "Holiday travel dates can affect schedules and fares; compare available itineraries and terms before choosing.",
    bullets: [
      "Consider flexible travel dates when possible.",
      "Compare full-trip timing, not only the ticket price.",
      "No discounted fare or seat is guaranteed until confirmed by the provider.",
    ],
  },
  {
    slug: "multi-city-flights",
    title: "Multi-City Flights",
    detail:
      "Review every city and flight segment as one connected itinerary, with dates and connections considered together.",
    bullets: [
      "Share each destination and preferred date.",
      "Compare the order and routing of the full journey.",
      "Check the connection plan between every segment.",
    ],
  },
  {
    slug: "cheap-flight-deals",
    title: "Cheap Flight Deals",
    detail:
      "Compare available itineraries by total trip cost, schedule, connections and fare restrictions.",
    bullets: [
      "Compare the full itinerary, not only the starting fare.",
      "Check baggage, seat and change costs that may apply.",
      "This page is not a live feed and does not promise the lowest fare.",
    ],
  },
];

const dealLinks: RelatedPage[] = dealCategories.map((deal) => ({
  title: deal.title,
  href: `/deals/${deal.slug}`,
  detail: deal.detail,
}));

const dealPages: SitePage[] = dealCategories.map((deal) => ({
  path: `/deals/${deal.slug}`,
  title: deal.title,
  eyebrow: "FLIGHT OPTIONS",
  description: deal.detail,
  sections: [
    {
      title: `Planning ${deal.title.toLowerCase()}`,
      paragraphs: [
        deal.detail,
        "Flight availability and prices are controlled by airlines and may change. FareDealFinder does not show live inventory or guarantee a discount, fare or seat. Share your trip details and call our team to discuss options for your dates.",
      ],
    },
    {
      title: "Details to compare",
      paragraphs: [
        "Before authorizing a booking, review the complete itinerary, the operating carriers and the fare conditions that apply.",
      ],
      bullets: deal.bullets,
    },
  ],
}));

const citySection: PageSection = {
  title: "Review the complete journey",
  paragraphs: [
    "Schedules, fares and routing depend on your departure point, travel dates and the operating airline. A flight request on this site is not a live search or a confirmed reservation. Review current itinerary and price details with the booking provider before deciding.",
  ],
  bullets: [
    "Compare connection airports and total journey time.",
    "Check whether each layover and airport transfer works for your plans.",
    "Review baggage, change and cancellation rules for the specific fare.",
    "Confirm current entry requirements with official sources.",
  ],
};

const cityPages: SitePage[] = cities.map((city) => ({
  path: `/city/cheap-flights-to-${city.slug}`,
  title: `Flights to ${city.name}, ${city.country}`,
  eyebrow: `${city.region.toUpperCase()} DESTINATION · ${city.code}`,
  description: city.detail,
  sections: [
    {
      title: `Planning a trip to ${city.name}`,
      paragraphs: [
        `Start with the schedule and arrival time you need. Available routes, connections and fares vary with your departure city and travel dates.`,
        `Use the trip request on our homepage to organize your route details, then call our team to discuss current options for ${city.name}.`,
      ],
    },
    citySection,
  ],
  related: cityLinks.filter(
    (item) => item.href !== `/city/cheap-flights-to-${city.slug}`,
  ),
}));

export const sitePages: SitePage[] = [
  {
    path: "/flight-services",
    title: "Our journeys",
    eyebrow: "YOUR JOURNEY, YOUR WAY",
    description:
      "From a long-awaited escape to an itinerary with several stops, explore flight assistance shaped around the way you travel.",
    sections: [
      {
        title: "International journeys",
        paragraphs: [
          "Long-haul adventures, meaningful reunions and new destinations deserve a considered route. Share your dates and preferred airports so we can help you review connections, arrival times and the full journey.",
        ],
        bullets: ["Departure and arrival airport choices", "Connection time and total travel time", "Flexible dates and route preferences"],
      },
      {
        title: "Premium cabin travel",
        paragraphs: [
          "Explore business and first-class itineraries with attention to the details that matter to you. Cabin features vary by airline, aircraft and route; review the specific itinerary and fare conditions before choosing.",
        ],
      },
      {
        title: "Multi-city itineraries",
        paragraphs: [
          "Visit several destinations with each flight considered as part of one journey. Tell us the cities, order of travel and dates for every stop so we can discuss how the segments fit together.",
        ],
      },
      {
        title: "Domestic, family and short-notice travel",
        paragraphs: [
          "Whether you are planning a quick domestic trip, a family holiday or travel at short notice, start with your priorities. Share passenger needs, timing constraints and any arrival deadline when discussing options with our team.",
          "FareDealFinder provides independent human-assisted flight planning. These pages do not show live fares or guarantee availability. Review the total price, applicable charges and ticket conditions before authorizing a booking.",
        ],
      },
    ],
    relatedGroups: [
      {
        title: "Find your way to fly",
        links: [
          { title: "International flights", href: "/deals/international-flights", detail: "Plan long-haul routes and connections." },
          { title: "Business class", href: "/deals/business-class-flights", detail: "Consider cabin choices and schedules." },
          { title: "First class", href: "/deals/first-class-flights", detail: "Review premium itineraries and terms." },
          { title: "Multi-city flights", href: "/deals/multi-city-flights", detail: "Connect every stop in your journey." },
          { title: "Domestic flights", href: "/deals/domestic-flights", detail: "Explore travel within the United States." },
          { title: "Last-minute flights", href: "/deals/last-minute-flights", detail: "Discuss plans for travel coming up soon." },
        ],
      },
      {
        title: "Start planning",
        links: [
          { title: "How it works", href: "/how-it-works", detail: "From your first request to itinerary review." },
          { title: "Destinations", href: "/destinations", detail: "Find inspiration for your next trip." },
          { title: "Contact us", href: "/contact-us", detail: "Talk through your travel priorities." },
        ],
      },
    ],
  },
  {
    path: "/how-it-works",
    title: "How it works",
    eyebrow: "SIMPLE STEPS. THOUGHTFUL SERVICE.",
    description:
      "You bring the destination. FareDealFinder helps you make sense of the journey, from sharing your plans to reviewing your itinerary.",
    sections: [
      {
        title: "01. Start with your plans",
        paragraphs: [
          "Use the trip form to choose your departure and arrival airports, travel dates, passengers and cabin preference. Select a one-way, round-trip or two-leg multi-city journey, then review your trip summary.",
          "Share your name, email and phone number through the enquiry form, or call our team. Include any flexibility or special priorities when you speak with a specialist.",
        ],
      },
      {
        title: "02. Explore the possibilities",
        paragraphs: [
          "Talk through routes, connection airports, travel time and cabin choices with a specialist. We help you understand how the available itinerary details fit your plans.",
        ],
        bullets: ["Compare the full journey and connection times", "Discuss baggage, seating and passenger needs", "Review fare conditions and any applicable service charges"],
      },
      {
        title: "03. Review before you decide",
        paragraphs: [
          "Check passenger names, airports, dates and flight segments carefully. Review the total pricing and the applicable change, cancellation and refund conditions before authorizing any booking.",
          "Submitting an enquiry does not reserve a seat, issue a ticket or confirm a fare. Prices and availability can change until a booking is confirmed under the applicable ticket terms.",
        ],
      },
      {
        title: "Help with the next step",
        paragraphs: [
          "For questions about a trip arranged through FareDealFinder, contact our team with your booking reference, passenger name and travel date. Changes and refunds depend on the airline and your ticket conditions.",
          "For urgent travel-day assistance, use the airline contact details on your confirmation. Verify travel documents and entry requirements before departure.",
        ],
      },
    ],
    related: [
      { title: "Our journeys", href: "/flight-services", detail: "Explore the ways we can help you travel." },
      { title: "Contact us", href: "/contact-us", detail: "Speak with our team about your plans." },
      { title: "Booking terms", href: "/terms-conditions", detail: "Understand the details before you book." },
    ],
  },
  {
    path: "/about-us",
    title: "Flight specialists for trips with more moving parts.",
    eyebrow: "ABOUT FAREDEALFINDER",
    description:
      "Flight assistance for international, multi-city, premium-cabin and time-sensitive journeys.",
    sections: [
      {
        title: "A service focused on air travel",
        paragraphs: [
          "Some trips involve several routes, connections, schedule constraints and fare rules. FareDealFinder helps travelers organize those details and discuss itinerary options with a travel specialist.",
          "Share your origin, destinations, dates, cabin preference and priorities. The right details depend on the trip, so tell us what matters most.",
        ],
      },
      {
        title: "Review before you decide",
        paragraphs: [
          "A trip request is not a reservation, a live fare search or a ticket. Before any booking, confirm the full itinerary, current fare conditions and any charges with the person or provider arranging the ticket.",
          "FareDealFinder does not operate flights or control airline schedules, availability, baggage rules or ticket decisions.",
        ],
      },
    ],
  },
  {
    path: "/deals",
    title: "Compare the journey, not just the fare.",
    eyebrow: "FLIGHT OPTIONS",
    description:
      "Browse domestic, international, premium-cabin, one-way, round-trip and multi-city trip pages.",
    sections: [
      {
        title: "No live deals or guaranteed prices",
        paragraphs: [
          "This page is a starting point for planning, not a live inventory or fare feed. Flight availability and prices are set by airlines and can change by route, date and ticket conditions.",
          "Share the itinerary you need and discuss current options with our team. Compare total journey time, connection details and fare restrictions alongside price.",
        ],
      },
      {
        title: "Requesting options does not book a seat",
        paragraphs: [
          "Entering trip details on this site does not create a reservation or charge. Review and confirm the final itinerary and pricing with the booking provider before authorizing a purchase.",
        ],
      },
    ],
    related: dealLinks,
  },
  {
    path: "/destinations",
    title: "Choose a destination. Then plan the whole route.",
    eyebrow: "DESTINATION GUIDES",
    description:
      "Browse destination guides and keep the full itinerary in view, from connection cities to arrival times.",
    sections: [
      {
        title: "Plan around the details that matter",
        paragraphs: [
          "A useful itinerary is more than a departure and arrival city. Travel dates, airport choices, connection times, total travel duration and fare rules can all affect whether a route works for you.",
          "Select a destination below to explore planning notes. Routes and schedules depend on your origin and travel dates.",
        ],
      },
      citySection,
    ],
    relatedGroups: destinationGroups,
  },
  {
    path: "/contact-us",
    title: "What can we help you with?",
    eyebrow: "CONTACT FAREDEALFINDER",
    description:
      "Call our team about a trip you are planning, a booking arranged with us or a question about the next step.",
    sections: [
      {
        title: "Planning a trip?",
        paragraphs: [
          "Use the homepage form to organize your route, dates, traveler count and cabin preference. The form prepares a trip summary in your browser; it does not send a booking request or search live fares. Call us to discuss the details and current options.",
        ],
      },
      {
        title: "Already have a ticket?",
        paragraphs: [
          "Call with the booking reference, passenger name and travel date for a booking coordinated through FareDealFinder. Change, cancellation and refund options depend on the ticket and airline. For urgent day-of-travel help, use the airline contact information on your confirmation.",
        ],
      },
      {
        title: "Questions about a charge?",
        paragraphs: [
          "Have the booking confirmation and charge details available when you call. Do not send payment card details through this website.",
        ],
      },
    ],
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    eyebrow: "YOUR INFORMATION",
    description:
      "What trip details this website handles and what happens when you contact our team.",
    sections: [
      {
        title: "Contact form messages",
        paragraphs: [
          "When you submit the contact form, we send your name, email address, optional phone number, selected subject and message to our support team by email. We use these details to respond to your inquiry. Do not include payment card details or passport information in your message.",
        ],
      },
      {
        title: "Trip details entered on this site",
        paragraphs: [
          "The flight form runs in your browser and does not submit a booking request. If you choose Review trip details, your route, dates, traveler count and cabin selection are added to the review-page URL and sent with that page request. The URL may remain in your browser history and may be recorded by website hosting systems.",
          "Do not enter payment card numbers or other sensitive personal information into the trip form.",
        ],
      },
      {
        title: "Information shared by phone",
        paragraphs: [
          "If you call us, you may choose to provide contact, travel or booking details so we can discuss your question. Share only information needed for that conversation.",
        ],
      },
      {
        title: "Service providers and policy changes",
        paragraphs: [
          "This site is hosted using website infrastructure that may process basic technical information needed to deliver pages. We will update this policy if the site's data practices change. Contact our team if you have a privacy question.",
        ],
      },
    ],
  },
  {
    path: "/terms-conditions",
    title: "Terms & Conditions",
    eyebrow: "USING THIS WEBSITE",
    description:
      "Important limits on trip requests, fares and travel information provided through FareDealFinder.",
    sections: [
      {
        title: "Flight assistance, not online booking",
        paragraphs: [
          "The trip form lets you organize details for discussion. It is not a live fare search, reservation or ticket purchase, and submitting it does not book a seat or create a charge.",
          "Any booking is separate from this website flow. Review the proposed itinerary, applicable fare conditions, the party handling ticketing and any charges before authorizing a purchase.",
        ],
      },
      {
        title: "Fares, schedules and availability",
        paragraphs: [
          "Airlines control flight schedules, fares and seat inventory. Information may change before a ticket is issued. Confirm current details and the total price with the booking provider before proceeding.",
        ],
      },
      {
        title: "Your review before travel",
        paragraphs: [
          "Check passenger names, dates, airports, connections, baggage terms and entry requirements before authorizing a booking. Airline and ticket-provider rules govern an issued ticket.",
        ],
      },
      {
        title: "Independent service",
        paragraphs: [
          "FareDealFinder is not an airline and does not operate flights. Airline names are used to identify carriers and do not indicate sponsorship or affiliation.",
        ],
      },
    ],
  },
  {
    path: "/cancellation-refund",
    title: "Changes, Cancellations & Refunds",
    eyebrow: "AFTER TICKETING",
    description:
      "The ticket's fare conditions and the airline's rules determine what changes or refunds may be available.",
    sections: [
      {
        title: "Airline ticket rules",
        paragraphs: [
          "Refund eligibility, change options and cancellation charges depend on the specific fare and the airline or ticketing provider. Some tickets may be refundable in full or in part; others may be restricted. Review those terms before authorizing a booking.",
        ],
      },
      {
        title: "Requesting help",
        paragraphs: [
          "For a booking coordinated through FareDealFinder, call our team with the booking reference, passenger name and requested change. We can help review the information available for that booking. Contact the airline directly for urgent travel-day assistance or when directed by your ticket provider.",
        ],
      },
      {
        title: "Service charges and timing",
        paragraphs: [
          "If a separate service charge applies, its amount and refund conditions should be reviewed before booking authorization. Refund processing time depends on the party that collected the payment and the payment provider. This page does not establish a separate 24-hour cancellation guarantee.",
        ],
      },
    ],
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy",
    eyebrow: "BROWSER SETTINGS",
    description:
      "Information about browser storage and the controls available to you.",
    sections: [
      {
        title: "Browser storage",
        paragraphs: [
          "The trip review link may contain the details you entered in its URL. Your browser can retain visited URLs in its history; use your browser's controls to clear that history when appropriate.",
          "We store your cookie preference in the faredealfinder_cookie_consent cookie for up to one year. This necessary cookie remembers whether you accepted or rejected optional cookies. If cookies are blocked, your choice is remembered only while this page remains open.",
        ],
      },
      {
        title: "Your choices",
        paragraphs: [
          "Optional Google Analytics cookies are used only after you select Accept optional cookies, and only when analytics is configured for this site. Rejecting optional cookies does not prevent you from using flight planning features. You can reopen Cookie settings at the bottom of any page to change your choice. Rejecting after accepting disables further analytics measurement and removes accessible Google Analytics cookies from this site. Browser settings also let you review and remove stored site data.",
        ],
      },
    ],
  },
  {
    path: "/disclaimer",
    title: "Travel Disclaimer",
    eyebrow: "IMPORTANT INFORMATION",
    description:
      "Understand the limits of online trip details and independent flight assistance.",
    sections: [
      {
        title: "FareDealFinder is not an airline",
        paragraphs: [
          "FareDealFinder provides flight-assistance information and does not operate aircraft or control airline schedules, fares, seat inventory, baggage services or airport operations. Airline names and marks belong to their respective owners and are used only to identify carriers.",
        ],
      },
      {
        title: "No live fares or guaranteed itinerary",
        paragraphs: [
          "The website does not display live inventory or confirm a fare. Availability and prices may change. A trip summary is for review and is not a reservation, ticket, or promise that a particular fare or route is available.",
        ],
      },
      {
        title: "Ticket terms and travel requirements",
        paragraphs: [
          "The applicable airline and fare rules govern changes, cancellations and refunds after ticketing. Travelers are responsible for verifying passport, visa, health and other entry requirements with official sources before departure.",
        ],
      },
    ],
  },
  {
    path: "/advertisement-disclosure",
    title: "Advertisement Disclosure",
    eyebrow: "HOW THIS SITE WORKS",
    description:
      "Information about promotional content, airline references and flight-option requests on FareDealFinder.",
    sections: [
      {
        title: "Flight information is not a live deal feed",
        paragraphs: [
          "Destination and flight-category pages provide general trip-planning information. They do not display live airline inventory, confirm a current fare or promise that a discount is available.",
        ],
      },
      {
        title: "Carrier names identify airlines",
        paragraphs: [
          "Airline names and marks are used only to identify carriers. Their appearance on this site does not imply sponsorship, endorsement or affiliation with FareDealFinder.",
        ],
      },
      {
        title: "Promotional relationships",
        paragraphs: [
          "If a page or link is paid for, sponsored or otherwise compensated, that relationship should be clearly identified alongside the content. Contact our team with a question about a specific placement.",
        ],
      },
    ],
  },
  ...dealPages,
  ...cityPages,
  airlinesIndexPage,
  ...airlinePages,
];

export const dealSlugs = dealCategories.map((deal) => deal.slug);

export function getSitePage(path: string) {
  return sitePages.find((page) => page.path === path);
}

import Image from "next/image";
import Link from "next/link";
import FlightRequestForm from "@/components/search/FlightRequestForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contactDetails } from "@/lib/contactDetails";
import { cities } from "@/lib/sitePages";

const journeys = [
  {
    number: "01",
    label: "A world of possibilities",
    title: "Beyond the everyday.",
    text: "Long-haul adventures, meaningful reunions and places you have always wanted to see. Let us help connect the dots.",
    image: "/premium-coast.webp",
    alt: "Sunlit Mediterranean coastline",
    href: "/deals/international-flights",
    link: "International journeys",
  },
  {
    number: "02",
    label: "Make the journey part of the trip",
    title: "A little more exceptional.",
    text: "Explore business and first-class itineraries with thoughtful attention to schedules, connections and fare conditions.",
    image: "/premium-lounge.webp",
    alt: "A quiet airport lounge overlooking the runway",
    href: "/deals/business-class-flights",
    link: "Premium cabin travel",
  },
  {
    number: "03",
    label: "Every stop, considered",
    title: "More places. Less guesswork.",
    text: "One journey, several destinations. We help make sense of complex routes so each flight works with the next.",
    image: "/hero-plane.jpg",
    alt: "An aircraft ready for its next journey",
    href: "/deals/multi-city-flights",
    link: "Multi-city itineraries",
  },
];

const steps = [
  [
    "Start with your plans",
    "Tell us where you want to go, when you want to travel and what matters most.",
  ],
  [
    "Explore the possibilities",
    "Talk through routes, connections, cabin choices and available fare conditions with a specialist.",
  ],
  [
    "Travel with clarity",
    "Review your full itinerary and applicable pricing before authorizing any booking.",
  ],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="premium-home">
        <section className="travel-hero" aria-labelledby="hero-title">
          <Image
            className="travel-hero-image"
            src="/premium-coast.webp"
            alt="Golden light over the Mediterranean coastline"
            fill
            sizes="100vw"
            preload
          />
          <div className="travel-hero-shade" />
          <div className="travel-container travel-hero-content">
            <p className="travel-eyebrow light">
              <span /> A more personal way to fly
            </p>
            <h1 id="hero-title">
              Extraordinary places.
              <br />
              Thoughtfully
              <br />
              <em>planned journeys.</em>
            </h1>
            <p className="hero-description">
              Your next chapter starts with the right flight. Discover clear
              options and personal guidance, wherever life takes you.
            </p>
            <div className="travel-actions">
              <a className="travel-button gold" href="/flight-search">
                Plan your journey <Arrow diagonal />
              </a>
              <a className="hero-call" href={contactDetails.phoneHref}>
                Speak with a specialist <Arrow />
              </a>
            </div>
            <div className="hero-assurance">
              <span aria-hidden="true">✧</span> Real people. Considered
              itineraries. Your peace of mind.
            </div>
          </div>
          <div className="hero-location">
            <span aria-hidden="true">◎</span>
            <div>
              THE WORLD IS CALLING<small>Amalfi Coast, Italy</small>
            </div>
          </div>
        </section>

        <section
          id="flight-search"
          className="travel-container journey-search"
          aria-labelledby="search-title"
        >
          <div className="search-heading">
            <div>
              <p className="travel-eyebrow">Where will you go next?</p>
              <h2 id="search-title">Every great journey starts here.</h2>
            </div>
            <span className="search-note">
              <span aria-hidden="true">✧</span> Personal guidance, from the
              first step.
            </span>
          </div>
          <FlightRequestForm />
        </section>

        <div
          className="travel-container travel-values"
          aria-label="Our approach"
        >
          <span>
            <b aria-hidden="true">◎</b> Itineraries shaped around you
          </span>
          <span>
            <b aria-hidden="true">◇</b> A dedicated human touch
          </span>
          <span>
            <b aria-hidden="true">✓</b> Clarity before you book
          </span>
        </div>

        <section
          id="flight-services"
          className="travel-container travel-section"
        >
          <div className="section-heading">
            <div>
              <p className="travel-eyebrow">Your journey, your way</p>
              <h2>
                For wherever
                <br />
                <em>you are headed.</em>
              </h2>
            </div>
            <p>
              From a long-awaited escape to a trip with more moving parts, find
              thoughtful flight assistance for the way you travel.
            </p>
          </div>
          <div className="journey-grid">
            {journeys.map((journey) => (
              <Link
                href={journey.href}
                className="journey-card"
                key={journey.number}
              >
                <div className="journey-photo">
                  <Image
                    src={journey.image}
                    alt={journey.alt}
                    fill
                    sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 30vw"
                  />
                  <span>
                    {journey.number} / {journey.link}
                  </span>
                  <b aria-hidden="true">↗</b>
                </div>
                <div className="journey-copy">
                  <p className="travel-eyebrow">{journey.label}</p>
                  <h3>{journey.title}</h3>
                  <p>{journey.text}</p>
                  <span className="travel-text-link">
                    {journey.link} <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="journey-other">
            <p>Plans coming together at the last minute?</p>
            <Link href="/deals/last-minute-flights">
              Let us help with short-notice travel <Arrow />
            </Link>
          </div>
        </section>

        <section id="about-faredealfinder" className="personal-section">
          <div className="travel-container personal-grid">
            <div className="personal-photo">
              <Image
                src="/premium-lounge.webp"
                alt="A calm, sunlit space to begin a journey"
                fill
                sizes="(max-width: 800px) 90vw, 48vw"
              />
              <div className="photo-caption">
                <span aria-hidden="true">✧</span>
                <p>
                  The details matter.
                  <br />
                  <em>So do you.</em>
                </p>
              </div>
            </div>
            <div className="personal-copy">
              <p className="travel-eyebrow">The FareDealFinder difference</p>
              <h2>
                Good travel starts
                <br />
                with <em>a real conversation.</em>
              </h2>
              <p>
                A flight is more than a departure time and a destination. It is
                the connection you need to make, the comfort you value and the
                reason you are going.
              </p>
              <p>
                We take the time to understand your priorities, then help you
                review the full journey with a little more care.
              </p>
              <ul>
                <li>
                  <span>01</span>
                  <div>
                    <h3>Thoughtful routing</h3>
                    <p>
                      Connections, airport changes and total journey time
                      considered together.
                    </p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Details made clear</h3>
                    <p>
                      Cabin choices, fare conditions and pricing explained
                      before you decide.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>People you can talk to</h3>
                    <p>
                      Personal assistance for questions before and after
                      ticketing.
                    </p>
                  </div>
                </li>
              </ul>
              <Link href="/about-us" className="travel-text-link">
                Get to know FareDealFinder <Arrow />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="travel-container travel-section process-section"
        >
          <div className="section-heading">
            <div>
              <p className="travel-eyebrow">
                Simple steps. Thoughtful service.
              </p>
              <h2>
                From inspiration
                <br />
                <em>to itinerary.</em>
              </h2>
            </div>
            <p>
              You bring the destination. We help you make sense of the journey,
              one considered step at a time.
            </p>
          </div>
          <ol className="process-grid">
            {steps.map(([title, text], index) => (
              <li key={title}>
                <span className="process-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p className="process-footnote">
            A request is free. No booking is made until you review the details
            and authorize it.
          </p>
        </section>

        <section className="destination-section">
          <div className="travel-container">
            <div className="section-heading">
              <div>
                <p className="travel-eyebrow light">A little inspiration</p>
                <h2>
                  The world is full
                  <br />
                  of <em>reasons to go.</em>
                </h2>
              </div>
              <Link className="travel-text-link" href="/destinations">
                Explore destinations <Arrow diagonal />
              </Link>
            </div>
            <div className="destination-grid">
              {cities.slice(0, 6).map((city) => (
                <Link
                  key={city.slug}
                  href={`/city/cheap-flights-to-${city.slug}`}
                >
                  <span className="destination-code">{city.code}</span>
                  <div>
                    <h3>{city.name}</h3>
                    <p>{city.country}</p>
                  </div>
                  <Arrow diagonal />
                </Link>
              ))}
            </div>
            <p className="destination-note">
              Destination guides offer planning inspiration. Fares and flight
              availability vary by route and date.
            </p>
          </div>
        </section>

        <section
          id="manage-your-trip"
          className="travel-container travel-section care-section"
        >
          <div>
            <p className="travel-eyebrow">
              A little reassurance goes a long way
            </p>
            <h2>
              Here for the journey.
              <br />
              <em>And the questions.</em>
            </h2>
            <p>
              Need to review a confirmation, ask about a change or understand
              your ticket rules? Contact our team about a trip arranged with us.
            </p>
            <Link href="/contact-us" className="travel-button dark">
              Manage your trip <Arrow />
            </Link>
          </div>
          <div id="pricing" className="clarity-card">
            <span className="clarity-symbol" aria-hidden="true">
              ◇
            </span>
            <p className="travel-eyebrow">Before you book</p>
            <h3>Confidence is in the details.</h3>
            <p>
              Review your itinerary, airfare and any applicable service charges
              before authorizing a booking. Change and cancellation options
              depend on the airline and your ticket conditions.
            </p>
            <Link href="/terms-conditions" className="travel-text-link">
              Our booking terms <Arrow />
            </Link>
          </div>
        </section>

        <section className="journey-cta">
          <div className="travel-container">
            <p className="travel-eyebrow">The next chapter is yours</p>
            <h2>
              Let us help you <em>get there.</em>
            </h2>
            <p>
              Share your plans. Start a conversation. See where it takes you.
            </p>
            <div className="travel-actions">
              <a href="#flight-search" className="travel-button dark">
                Plan your journey <Arrow diagonal />
              </a>
              <a href={contactDetails.phoneHref} className="travel-text-link">
                {contactDetails.phone} <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

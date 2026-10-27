import FlightSearchSection from "@/components/search/FlightSearchSection";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

import { SITE_URL } from "@/lib/siteMetadata";
import CheapFlights from "@/components/CheapFlights";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = slug
    .replace(/^cheap-flights-to-/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return city
    ? {
        title: `Cheap Flights To ${city}`,
        description: `Cheap Flights To ${city}`,
        alternates: { canonical: new URL(`/city/${slug}`, SITE_URL) },
        openGraph: {
          title: `Cheap Flights To ${city}`,
          description: `Cheap Flights To ${city}`,
          url: new URL(`/city/${slug}`, SITE_URL),
        },
      }
    : {};
}

export default async function DealCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug.startsWith("cheap-flights-to-")) {
    return notFound();
  }
  const city = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <SiteHeader />
      <CheapFlights city={city} afterHero={<FlightSearchSection />} />
      <SiteFooter />
    </>
  );
}

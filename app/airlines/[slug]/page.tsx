import FlightSearchSection from "@/components/search/FlightSearchSection";
import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { airlines, getAirlinePage } from "@/lib/airlines";
import { SITE_URL } from "@/lib/siteMetadata";

type AirlinePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return airlines.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: AirlinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAirlinePage(slug);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: new URL(page.path, SITE_URL) },
    openGraph: {
      title: page.title,
      description: page.description,
      url: new URL(page.path, SITE_URL),
    },
  };
}

export default async function AirlinePage({ params }: AirlinePageProps) {
  const { slug } = await params;
  const page = getAirlinePage(slug);

  return (
    <>
      <SiteHeader />
      <ContentPage page={page} afterHero={<FlightSearchSection />} />
      <SiteFooter />
    </>
  );
}

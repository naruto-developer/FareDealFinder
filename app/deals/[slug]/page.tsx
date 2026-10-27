import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/ContentPage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { dealSlugs, getSitePage } from "@/lib/sitePages";
import { SITE_URL } from "@/lib/siteMetadata";

type DealPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return dealSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DealPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSitePage(`/deals/${slug}`);
  return page
    ? {
        title: page.title,
        description: page.description,
        alternates: { canonical: new URL(page.path, SITE_URL) },
        openGraph: {
          title: page.title,
          description: page.description,
          url: new URL(page.path, SITE_URL),
        },
      }
    : {};
}

export default async function DealCategoryPage({ params }: DealPageProps) {
  const { slug } = await params;
  const page = getSitePage(`/deals/${slug}`);
  if (!page) notFound();

  return (
    <>
      <SiteHeader />
      <ContentPage page={page} />
      <SiteFooter />
    </>
  );
}

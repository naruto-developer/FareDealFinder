import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/ContentPage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getSitePage } from "@/lib/sitePages";
import { SITE_URL } from "@/lib/siteMetadata";

export function pageMetadata(path: string): Metadata {
  const page = getSitePage(path);
  return page
    ? {
        title: page.title,
        description: page.description,
        alternates: { canonical: new URL(path, SITE_URL) },
        openGraph: {
          title: page.title,
          description: page.description,
          url: new URL(path, SITE_URL),
        },
      }
    : {};
}

export function createSitePage(path: string) {
  function SitePage() {
    const page = getSitePage(path);
    if (!page) notFound();
    return (
      <>
        <SiteHeader />
        <ContentPage page={page} />
        <SiteFooter />
      </>
    );
  }

  return SitePage;
}

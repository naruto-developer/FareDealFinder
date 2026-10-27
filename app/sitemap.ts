import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteMetadata";
import { sitePages } from "@/lib/sitePages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sitePages.map((page) => ({
      url: new URL(page.path, SITE_URL).toString(),
      changeFrequency: page.path.startsWith("/deals/")
        ? ("monthly" as const)
        : ("weekly" as const),
      priority: page.path === "/deals" || page.path === "/destinations" ? 0.9 : 0.7,
    })),
  ];
}
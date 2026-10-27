import type { Metadata } from "next";
import { contactDetails } from "@/lib/contactDetails";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/siteMetadata";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import MobileCallBar from "@/components/MobileCallBar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: `Human-Assisted Flight Planning | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `Human-Assisted Flight Planning | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "FareDealFinder flight planning banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Human-Assisted Flight Planning | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    images: ["/banner.png"],
  },
  robots: { index: true, follow: true },
};

const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const analyticsEnabled = Boolean(analyticsId && /^G-[A-Z0-9]+$/.test(analyticsId));

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: contactDetails.companyName,
    url: SITE_URL,
    logo: `${SITE_URL}/faredealfinder-logo.png`,
    telephone: contactDetails.phoneHref.replace("tel:", ""),
    email: contactDetails.email,
    address: contactDetails.address,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: contactDetails.phoneHref.replace("tel:", ""),
      email: contactDetails.email,
      availableLanguage: "English",
    },
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth motion-reduce:scroll-auto">
      <body className="m-0 bg-paper font-sans text-ink max-[600px]:pb-[calc(3rem+env(safe-area-inset-bottom))]">
        {children}
        <MobileCallBar />
        <CookieConsent analyticsId={analyticsEnabled ? analyticsId : undefined} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

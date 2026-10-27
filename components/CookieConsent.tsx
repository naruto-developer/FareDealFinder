"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { clearAnalyticsCookies, getConsent, getServerConsent, saveConsent, subscribeConsent, type CookieChoice } from "@/lib/cookieConsent";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
} & Partial<Record<`ga-disable-${string}`, boolean>>;

export default function CookieConsent({ analyticsId }: { analyticsId?: string }) {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const validId = analyticsId && /^G-[A-Z0-9]+$/.test(analyticsId) ? analyticsId : undefined;
  const visible = consent === "unknown" || preferencesOpen;

  useEffect(() => {
    if (consent === "pending") return;
    if (validId) (window as unknown as AnalyticsWindow)[`ga-disable-${validId}`] = consent !== "accepted";
    if (consent !== "accepted") clearAnalyticsCookies();
  }, [consent, validId]);

  function choose(choice: CookieChoice) {
    // Disable an already loaded tag immediately when consent is withdrawn.
    if (validId) (window as unknown as AnalyticsWindow)[`ga-disable-${validId}`] = choice !== "accepted";
    if (choice === "rejected") clearAnalyticsCookies();
    saveConsent(choice);
    setPreferencesOpen(false);
  }

  function initializeAnalytics() {
    if (!validId || getConsent() !== "accepted") return;
    const analytics = window as unknown as AnalyticsWindow;
    analytics[`ga-disable-${validId}`] = false;
    analytics.dataLayer = analytics.dataLayer || [];
    // Google tag consumes Arguments entries in its command queue.
    // eslint-disable-next-line prefer-rest-params
    analytics.gtag = function () { analytics.dataLayer!.push(arguments); };
    analytics.gtag("js", new Date());
    analytics.gtag("config", validId, { allow_google_signals: false, allow_ad_personalization_signals: false });
  }

  return (
    <>
      {consent === "accepted" && validId && <Script id="consent-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${validId}`} strategy="afterInteractive" onReady={initializeAnalytics} />}
      {visible ? (
        <section aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-description" className="fixed inset-x-3 bottom-3 max-[600px]:bottom-[calc(3.75rem+env(safe-area-inset-bottom))] max-[600px]:max-h-[70dvh] z-[100] mx-auto max-h-[85dvh] max-w-5xl overflow-y-auto rounded-2xl border border-stone-200 bg-[#fffefa] p-5 text-ink shadow-[0_8px_60px_#123d3033] sm:inset-x-6 sm:bottom-6 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Your privacy, your choice</p>
              <h2 id="cookie-consent-title" className="font-serif text-2xl">A little note about cookies</h2>
              <p id="cookie-consent-description" className="mt-2 text-sm leading-6 text-slate-600">We use necessary storage to remember your cookie choice. With your permission, we also use analytics cookies to understand site usage. You can reject optional cookies and still use the website.</p>
              <Link href="/cookie-policy" className="mt-2 inline-block py-1 text-xs font-semibold text-brand underline underline-offset-4">Read our cookie policy</Link>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <button type="button" onClick={() => choose("rejected")} className="min-h-11 rounded-lg border border-brand px-5 py-3 text-sm font-semibold text-brand transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Reject optional cookies</button>
              <button type="button" onClick={() => choose("accepted")} className="min-h-11 rounded-lg border border-brand bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">Accept optional cookies</button>
              {preferencesOpen && consent !== "unknown" && <button type="button" onClick={() => setPreferencesOpen(false)} className="min-h-11 px-3 text-xs text-slate-600 underline underline-offset-4">Keep current choice</button>}
            </div>
          </div>
        </section>
      ) : consent === "rejected" && (
        <button type="button" onClick={() => setPreferencesOpen(true)} className="fixed bottom-3 left-3 max-[600px]:bottom-[calc(3.75rem+env(safe-area-inset-bottom))] z-[60] min-h-11 rounded-full border border-stone-200 bg-[#fffefa] px-4 py-2 text-xs font-semibold text-brand shadow-md transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:bottom-5 sm:left-5">Cookie settings</button>
      )}
    </>
  );
}

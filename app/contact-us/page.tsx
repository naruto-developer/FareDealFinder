import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata } from "@/components/SitePageRoute";
import { contactDetails } from "@/lib/contactDetails";
import { getSitePage } from "@/lib/sitePages";

export const metadata = pageMetadata("/contact-us");

export default function ContactPage() {
  const page = getSitePage("/contact-us")!;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden bg-[#123d36] text-white">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(12_34_37/96%),rgb(12_34_37/65%)),url('/hero-plane.jpg')] bg-cover bg-center" aria-hidden="true" />
          <div className="travel-container py-16 md:py-24">
            <nav aria-label="Breadcrumb" className="mb-10 flex gap-3 text-xs text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact us</span>
            </nav>
            <p className="text-xs font-bold tracking-[0.18em] text-[#dfc89d]">CONTACT FAREDEALFINDER</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.1] md:text-7xl">Let’s talk about<br />your next journey.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/75">{page.description}</p>
          </div>
        </section>

        <section aria-labelledby="contact-options" className="travel-container py-14 md:py-20">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-brand">WE’RE HERE TO HELP</p>
              <h2 id="contact-options" className="mt-3 font-serif text-3xl md:text-4xl">A conversation is a good place to start.</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="min-w-0 border border-line bg-white p-7 md:p-8">
              <span className="text-xs font-bold tracking-widest text-brand">01 / CALL US</span>
              <h3 className="mt-5 font-serif text-2xl">Speak with our team</h3>
              <p className="mt-3 text-sm leading-7 text-muted">Talk through flight options or get help with a booking arranged through us.</p>
              <a href={contactDetails.phoneHref} className="mt-6 inline-flex min-h-11 items-center border-b border-brand text-lg font-bold text-brand">{contactDetails.phone} <span className="ml-3" aria-hidden="true">↗</span></a>
            </div>
            <div className="min-w-0 border border-line bg-white p-7 md:p-8">
              <span className="text-xs font-bold tracking-widest text-brand">02 / EMAIL US</span>
              <h3 className="mt-5 font-serif text-2xl">Put your plans in writing</h3>
              <p className="mt-3 text-sm leading-7 text-muted">Share your question, travel dates and route so we can understand what you need.</p>
              <a href={contactDetails.emailHref} className="mt-6 inline-flex min-h-11 max-w-full items-center break-all border-b border-brand text-sm font-bold text-brand">{contactDetails.email} <span className="ml-3 shrink-0" aria-hidden="true">↗</span></a>
            </div>
            <div className="min-w-0 border border-[#d8dfd3] bg-[#eaf0e7] p-7 md:p-8">
              <span className="text-xs font-bold tracking-widest text-brand">03 / BUSINESS DETAILS</span>
              <h3 className="mt-5 font-serif text-2xl">{contactDetails.companyName}</h3>
              <address className="mt-3 text-sm leading-7 text-muted not-italic">{contactDetails.address}</address>
              <p className="mt-5 border-t border-[#cdd8ca] pt-5 text-sm leading-7 text-muted">{contactDetails.supportHours}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="before-contacting" className="travel-container grid gap-10 border-t border-line py-14 md:grid-cols-[1fr_1.5fr] md:gap-20 md:py-20">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-brand">BEFORE WE CHAT</p>
            <h2 id="before-contacting" className="mt-4 font-serif text-3xl md:text-4xl">A few details can<br />go a long way.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">Have your travel details handy to help us point you in the right direction.</p>
            <Link href="/#flight-search" className="mt-6 inline-flex min-h-12 items-center gap-5 bg-brand px-6 text-sm font-bold text-white hover:bg-[#125e5c]">Plan your trip <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="divide-y divide-line">
            {page.sections.map((section) => (
              <section key={section.title} className="py-6 first:pt-0">
                <h3 className="font-serif text-2xl">{section.title}</h3>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-7 text-muted">{paragraph}</p>)}
              </section>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

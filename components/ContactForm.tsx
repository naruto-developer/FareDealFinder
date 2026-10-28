"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setPending(true);
    setResult(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(values)),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Unable to send your message. Please try again.");
      setResult({ success: true, message: "Thank you! Your message has been sent to our team." });
      form.reset();
    } catch (error) {
      setResult({ success: false, message: error instanceof Error ? error.message : "Unable to send your message. Please try again." });
    } finally {
      setPending(false);
    }
  }

  const fieldClass = "mt-2 w-full rounded-sm border border-line bg-white px-4 py-3 text-base font-normal text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <section aria-labelledby="contact-form-title" className="travel-container pb-14 md:pb-20">
      <div className="grid gap-8 border border-line bg-[#eaf0e7] p-6 md:grid-cols-[1fr_1.5fr] md:gap-16 md:p-12">
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-brand">SEND A MESSAGE</p>
          <h2 id="contact-form-title" className="mt-4 font-serif text-3xl md:text-4xl">How can we help?</h2>
          <p className="mt-5 text-sm leading-7 text-muted">Ask about a trip, an existing booking or a general question. Our team will get back to you by email.</p>
          <p className="mt-4 text-sm leading-7 text-muted">For a booking question, include your booking reference. Please do not include payment card details or passport information.</p>
        </div>
        <form onSubmit={submit} aria-busy={pending}>
          <fieldset disabled={pending} className="grid min-w-0 gap-5 disabled:opacity-70 sm:grid-cols-2">
            <legend className="sr-only">Your contact details and message</legend>
            <label className="text-sm font-bold">Full name *
              <input className={fieldClass} name="name" autoComplete="name" required maxLength={100} />
            </label>
            <label className="text-sm font-bold">Email address *
              <input className={fieldClass} name="email" type="email" autoComplete="email" required maxLength={254} />
            </label>
            <label className="text-sm font-bold">Phone number (optional)
              <input className={fieldClass} name="phone" type="tel" autoComplete="tel" maxLength={40} />
            </label>
            <label className="text-sm font-bold">Subject *
              <select className={fieldClass} name="subject" required defaultValue="">
                <option value="" disabled>Select a topic</option>
                <option>Planning a trip</option>
                <option>Existing booking</option>
                <option>Billing question</option>
                <option>General inquiry</option>
              </select>
            </label>
            <label className="text-sm font-bold sm:col-span-2">Message *
              <textarea className={`${fieldClass} min-h-36 resize-y`} name="message" required maxLength={5000} rows={5} />
            </label>
            <p className="text-xs leading-6 text-muted sm:col-span-2">Required fields are marked *. Read our <Link href="/privacy-policy" className="text-brand underline">Privacy Policy</Link> to learn how we handle your information.</p>
            <button type="submit" className="min-h-12 bg-brand px-7 py-3 text-sm font-bold text-white hover:bg-[#125e5c] disabled:cursor-wait sm:justify-self-start">{pending ? "Sending…" : "Send message"}</button>
          </fieldset>
          <div aria-live="polite" aria-atomic="true" className="mt-4">
            {result && <p className={`text-sm leading-6 ${result.success ? "text-brand" : "text-red-700"}`}>{result.message}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

"use client";

import type { TravelAirport } from "@/lib/types";
import React, { useState } from "react";

type MailFormData = {
  Name: string;
  Email: string;
  Phone: string;
};

type MailFormProps = {
  search: {
    tripType: "one-way" | "round-trip" | "multi-city";
    from: TravelAirport;
    to: TravelAirport;
    departureDate: string;
    returnDate: string;
    travelers: number;
    cabin: string;
    cabinLabel: string;
    nextFrom?: TravelAirport;
    nextTo?: TravelAirport;
    secondDeparture?: string;
  };
};

const fields = [
  {
    key: "Name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
    placeholder: "Your full name",
    path: "M20 21v-2a7 7 0 0 0-14 0v2M17 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  },
  {
    key: "Email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
    path: "m3 5 9 7 9-7M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  },
  {
    key: "Phone",
    label: "Phone number",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+1 (555) 000-0000",
    path: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z",
  },
] as const;

export default function MailForm({ search }: MailFormProps) {
  const formId = React.useId();
  const [formData, setFormData] = useState<MailFormData>({
    Name: "",
    Email: "",
    Phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || submitted) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/submit-mail-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          search,
        }),
      });
      if (!response.ok) {
        setError("Failed to submit the form. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={`${formId}-title`}
      aria-busy={loading}
      className="mt-6 overflow-hidden rounded-2xl border border-teal-900/10 bg-gradient-to-br from-teal-50/80 via-white to-white shadow-sm"
    >
      <h2
        id={`${formId}-title`}
        className="mt-3 px-5 sm:px-6 font-serif text-xl md:text-2xl text-ink"
      >
        Let us help you find your flight
      </h2>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        {submitted ? (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 p-5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>
            <div>
              <p className="font-semibold text-ink">
                Thank you for your request!
              </p>
              <p className="mt-1 text-sm leading-6 text-teal-800">
                Your details have been submitted. Our team will be in touch to
                help with your trip.
              </p>
            </div>
          </div>
        ) : (
          <>
            <fieldset
              disabled={loading}
              className="grid min-w-0 gap-5 sm:grid-cols-3"
            >
              <legend className="sr-only">Your contact details</legend>
              {fields.map((field) => (
                <div key={field.key} className="min-w-0">
                  <label
                    htmlFor={`${formId}-${field.key}`}
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    {field.label}{" "}
                    <span className="text-brand" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-teal-700/65"
                    >
                      <path d={field.path} />
                    </svg>
                    <input
                      id={`${formId}-${field.key}`}
                      required
                      name={field.key.toLowerCase()}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-11 text-sm text-ink shadow-xs transition placeholder:text-slate-400 hover:border-teal-300 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 disabled:cursor-wait disabled:opacity-60"
                    />
                  </div>
                </div>
              ))}
            </fieldset>
            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}
            <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-5 text-muted">
                All fields are required. We will use these details to respond to
                your flight enquiry.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    Sending your request...
                  </>
                ) : (
                  <>
                    Get A Free Quote
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <path d="M4 12h16m-6-6 6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

"use client";

import { useId, useState, type ReactNode } from "react";

export default function CollapsibleFlightDetails({
  children,
  route,
}: {
  children: ReactNode;
  route: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded(!expanded)}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 sm:hidden"
      >
        <span className="min-w-0">
          <span className="block text-xs font-bold uppercase tracking-wide text-teal-700">
            Flight details
          </span>
          <span className="mt-1 block text-sm font-semibold text-ink">{route}</span>
          <span className="mt-1 block text-xs text-slate-500">
            {expanded ? "Hide details" : "Show details"}
          </span>
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`size-5 shrink-0 text-teal-700 transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div id={contentId} className={`${expanded ? "block" : "hidden"} sm:block`}>
        {children}
      </div>
    </div>
  );
}

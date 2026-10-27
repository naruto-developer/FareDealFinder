"use client";

import { useEffect, useId, useState } from "react";
import type { KeyboardEvent } from "react";
import type { AirportOption } from "@/lib/airports";

type AirportComboboxProps = {
  id: string;
  name: string;
  label: string;
  selected: AirportOption | null;
  onSelect: (airport: AirportOption | null) => void;
  required?: boolean;
};

function airportLabel(airport: AirportOption) {
  return `${airport.city} (${airport.iata})`;
}

export default function AirportCombobox({
  id,
  name,
  label,
  selected,
  onSelect,
  required = false,
}: AirportComboboxProps) {
  const listId = useId();
  const [query, setQuery] = useState(() =>
    selected ? `${selected.city} (${selected.iata})` : "",
  );
  const [airports, setAirports] = useState<AirportOption[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (selected || normalizedQuery.length < 2) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/airports?q=${encodeURIComponent(normalizedQuery)}&limit=8`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Airport lookup failed");

        const payload = (await response.json()) as {
          airports?: AirportOption[];
        };
        setAirports(Array.isArray(payload.airports) ? payload.airports : []);
        setActiveIndex(-1);
        setOpen(true);
      } catch (lookupError) {
        if (lookupError instanceof Error && lookupError.name === "AbortError") {
          return;
        }
        setAirports([]);
        setError("Airport suggestions could not load. Please try again.");
        setOpen(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, selected]);

  function chooseAirport(airport: AirportOption) {
    onSelect(airport);
    setQuery(airportLabel(airport));
    setAirports([]);
    setOpen(false);
    setActiveIndex(-1);
    setError("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, airports.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && open && airports[activeIndex]) {
      event.preventDefault();
      chooseAirport(airports[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  const status = loading
    ? "Searching airports…"
    : error ||
      (airports.length === 0 && query.trim().length >= 2 && open
        ? "No matching airports found."
        : "Type at least 2 characters to search.");

  return (
    <div
      className="relative min-w-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-ink"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={query}
        required={required}
        maxLength={80}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
        }
        aria-describedby={`${id}-hint`}
        placeholder="City or airport code"
        className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-teal-700/15"
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          onSelect(null);
          setAirports([]);
          setActiveIndex(-1);
          setLoading(false);
          setError("");
          setOpen(true);
        }}
        onFocus={() => {
          if (airports.length > 0) setOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
      <input type="hidden" name={name} value={selected?.iata ?? ""} />
      <p id={`${id}-hint`} className="sr-only" aria-live="polite">
        {status}
      </p>
      {open &&
        (loading ||
          error ||
          airports.length > 0 ||
          query.trim().length >= 2) && (
          <ul
            id={listId}
            role="listbox"
            aria-label={`${label} airport suggestions`}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-xl"
          >
            {loading && (
              <li className="px-3 py-2.5 text-sm text-slate-600" role="status">
                Searching airports…
              </li>
            )}
            {!loading && error && (
              <li className="px-3 py-2.5 text-sm text-red-700" role="alert">
                {error}
              </li>
            )}
            {!loading &&
              !error &&
              airports.length === 0 &&
              query.trim().length >= 2 && (
                <li className="px-3 py-2.5 text-sm text-slate-600">
                  No matching airports found.
                </li>
              )}
            {!loading &&
              airports.map((airport, index) => (
                <li key={airport.iata} role="presentation">
                  <button
                    id={`${listId}-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left transition ${index === activeIndex ? "bg-teal-50" : "hover:bg-slate-50"}`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => chooseAirport(airport)}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-ink">
                        {airport.city}
                      </span>
                      <span className="block truncate text-xs text-slate-500">
                        {airport.name} · {airport.country}
                      </span>
                    </span>
                    <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                      {airport.iata}
                    </span>
                  </button>
                </li>
              ))}
          </ul>
        )}
    </div>
  );
}

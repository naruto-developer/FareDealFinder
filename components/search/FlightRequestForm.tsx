"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import AirportCombobox from "@/components/search/AirportCombobox";
import { getAirportByIata, type AirportOption } from "@/lib/airports";

type TripType = "round-trip" | "one-way" | "multi-city";

const today = new Date();
const todayString = new Date(
  today.getTime() - today.getTimezoneOffset() * 60_000,
)
  .toISOString()
  .slice(0, 10);

const tripTypes: { value: TripType; label: string }[] = [
  { value: "round-trip", label: "Round trip" },
  { value: "one-way", label: "One way" },
  { value: "multi-city", label: "Multi-city" },
];

export default function FlightRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [tripType, setTripType] = useState<TripType>(() =>
    searchParams.get("tripType") === "one-way" ||
    searchParams.get("tripType") === "multi-city"
      ? (searchParams.get("tripType") as TripType)
      : "round-trip",
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams.get("departure") ?? "",
  );
  const [returnDate, setReturnDate] = useState(
    searchParams.get("returnDate") ?? "",
  );
  const [secondDeparture, setSecondDeparture] = useState(
    searchParams.get("secondDeparture") ?? "",
  );
  const [travelers, setTravelers] = useState(() => {
    const value = Number(searchParams.get("travelers"));
    return Number.isInteger(value) && value >= 1 && value <= 9 ? value : 1;
  });
  const [cabin, setCabin] = useState(searchParams.get("cabin") ?? "Economy");
  const [from, setFrom] = useState<AirportOption | null>(
    () =>
      getAirportByIata(searchParams.get("from")?.toUpperCase() ?? "") ?? null,
  );
  const [to, setTo] = useState<AirportOption | null>(
    () => getAirportByIata(searchParams.get("to")?.toUpperCase() ?? "") ?? null,
  );
  const [nextFrom, setNextFrom] = useState<AirportOption | null>(
    () =>
      getAirportByIata(searchParams.get("nextFrom")?.toUpperCase() ?? "") ??
      null,
  );
  const [nextTo, setNextTo] = useState<AirportOption | null>(
    () =>
      getAirportByIata(searchParams.get("nextTo")?.toUpperCase() ?? "") ?? null,
  );
  const [error, setError] = useState("");

  function openDatePicker(input: HTMLInputElement) {
    if (input.disabled) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;
    setError("");
    const form = event.currentTarget;
    const departure = String(new FormData(form).get("departure") ?? "");
    const returnDate = String(new FormData(form).get("returnDate") ?? "");
    const secondDeparture = String(
      new FormData(form).get("secondDeparture") ?? "",
    );

    const missingAirport = !from
      ? "from-airport-input"
      : !to
        ? "to-airport-input"
        : tripType === "multi-city" && !nextFrom
          ? "next-from-airport-input"
          : tripType === "multi-city" && !nextTo
            ? "next-to-airport-input"
            : null;

    if (missingAirport) {
      setError(
        "Choose an airport from the suggestions for every flight segment.",
      );
      document.getElementById(missingAirport)?.focus();
      return;
    }

    if (
      (from && to && from.iata === to.iata) ||
      (tripType === "multi-city" &&
        nextFrom &&
        nextTo &&
        nextFrom.iata === nextTo.iata)
    ) {
      setError(
        "Each flight segment needs a different departure and arrival airport.",
      );
      return;
    }

    if (tripType === "round-trip" && returnDate < departure) {
      setError("Return date must be the same as or later than departure.");
      return;
    }

    if (tripType === "multi-city" && secondDeparture < departure) {
      setError(
        "The next flight date must be the same as or later than the first departure.",
      );
      return;
    }

    const query = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      if (typeof value === "string" && value.trim()) query.set(key, value);
    });
    startTransition(() => router.push(`/search?${query.toString()}`));
  }

  return (
    <form
      action="/search"
      method="get"
      onSubmit={handleSubmit}
      className="grid gap-4"
      aria-label="Search flight options"
    >
      <input type="hidden" name="tripType" value={tripType} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1"
          role="group"
          aria-label="Trip type"
        >
          {tripTypes.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={tripType === item.value}
              onClick={() => {
                setTripType(item.value);
                setError("");
              }}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/30 ${tripType === item.value ? "bg-teal-700 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-slate-900"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="text-xs font-medium text-slate-500">
          No charge or obligation to request options
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <AirportCombobox
            id="from-airport-input"
            name="from"
            label="Flying from"
            selected={from}
            onSelect={setFrom}
            required
          />
        </div>
        <div className="lg:col-span-2">
          <AirportCombobox
            id="to-airport-input"
            name="to"
            label="Flying to"
            selected={to}
            onSelect={setTo}
            required
          />
        </div>

        <label
          className="block text-xs font-semibold text-ink"
          onClick={(event) =>
            openDatePicker(event.currentTarget.querySelector("input")!)
          }
        >
          <span className="mb-1.5 block">Departure</span>
          <input
            className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-teal-700/15"
            name="departure"
            type="date"
            min={todayString}
            value={departureDate}
            onChange={(event) => setDepartureDate(event.currentTarget.value)}
            required
          />
        </label>

        <label
          className={`block text-xs font-semibold text-ink ${tripType !== "round-trip" ? "opacity-50" : ""}`}
          onClick={(event) =>
            openDatePicker(event.currentTarget.querySelector("input")!)
          }
        >
          <span className="mb-1.5 block">Return</span>
          <input
            className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-teal-700/15 disabled:cursor-not-allowed"
            name="returnDate"
            type="date"
            min={departureDate || todayString}
            value={returnDate}
            onChange={(event) => setReturnDate(event.currentTarget.value)}
            required={tripType === "round-trip"}
            disabled={tripType !== "round-trip"}
          />
        </label>

        {tripType === "multi-city" && (
          <>
            <div className="sm:col-span-2 lg:col-span-2">
              <AirportCombobox
                id="next-from-airport-input"
                name="nextFrom"
                label="Next flight from"
                selected={nextFrom}
                onSelect={setNextFrom}
                required
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <AirportCombobox
                id="next-to-airport-input"
                name="nextTo"
                label="Next flight to"
                selected={nextTo}
                onSelect={setNextTo}
                required
              />
            </div>
            <label
              className="block text-xs font-semibold text-ink hover:cursor-pointer"
              onClick={(event) =>
                openDatePicker(event.currentTarget.querySelector("input")!)
              }
            >
              <span className="mb-1.5 block">Next departure</span>
              <input
                className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-teal-700/15 hover:cursor-pointer"
                name="secondDeparture"
                type="date"
                min={departureDate || todayString}
                value={secondDeparture}
                onChange={(event) =>
                  setSecondDeparture(event.currentTarget.value)
                }
                required
              />
            </label>
          </>
        )}

        <label className="block text-xs font-semibold text-ink hover:cursor-pointer">
          <span className="mb-1.5 block">Travelers</span>
          <select
            className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-teal-700/15"
            name="travelers"
            value={travelers}
            onChange={(event) =>
              setTravelers(Number(event.currentTarget.value))
            }
          >
            {Array.from({ length: 9 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "traveler" : "travelers"}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-semibold text-ink">
          <span className="mb-1.5 block">Cabin class</span>
          <select
            className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-teal-700/15"
            name="cabin"
            value={cabin}
            onChange={(event) => setCabin(event.currentTarget.value)}
          >
            <option>Economy</option>
            <option>Premium economy</option>
            <option>Business</option>
            <option>First class</option>
          </select>
        </label>

        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/40 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-75 sm:col-span-2 lg:col-span-2"
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <>
              <span
                className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-hidden="true"
              />
              Searching…
            </>
          ) : (
            <>
              Find flight options <span aria-hidden="true">↗</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      )}
      <p className="text-center text-xs text-slate-500">
        No booking is made here. Search details are used to prepare your trip
        summary.
      </p>
    </form>
  );
}

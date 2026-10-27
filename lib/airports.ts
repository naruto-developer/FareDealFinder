import airportData from "@/data/airports.json";

export type AirportOption = {
  city: string;
  country: string;
  iata: string;
  name: string;
};

type AirportRecord = AirportOption & { icao: string };

const airports = airportData as AirportRecord[];
const airportByIata = new Map(airports.map((airport) => [airport.iata, airport]));

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function getAirportByIata(iata: string) {
  return airportByIata.get(iata.toUpperCase());
}

export function searchAirports(query: string, limit = 8): AirportOption[] {
  const normalizedQuery = normalize(query.trim());
  if (normalizedQuery.length < 2) return [];

  return airports
    .map((airport) => {
      const city = normalize(airport.city);
      const name = normalize(airport.name);
      const country = normalize(airport.country);
      const iata = airport.iata.toLowerCase();
      const rank =
        iata === normalizedQuery
          ? 0
          : city.startsWith(normalizedQuery)
            ? 1
            : name.startsWith(normalizedQuery)
              ? 2
              : iata.startsWith(normalizedQuery)
                ? 3
                : city.includes(normalizedQuery) ||
                    name.includes(normalizedQuery) ||
                    country.includes(normalizedQuery)
                  ? 4
                  : Number.POSITIVE_INFINITY;

      return { airport, rank };
    })
    .filter(({ rank }) => Number.isFinite(rank))
    .sort((left, right) => left.rank - right.rank || left.airport.city.localeCompare(right.airport.city))
    .slice(0, limit)
    .map(({ airport }) => ({
      city: airport.city,
      country: airport.country,
      iata: airport.iata,
      name: airport.name,
    }));
}
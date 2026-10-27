

// export interface Airport {
//   name: string;
//   city: string;
//   country: string;
//   iata: string;
//   icao?: string | null;
// }
export type TripType = 'one-way' | 'round-trip';
export interface TravelAirport { code: string; name: string; city: string; country: string; }
// export interface InitialSearch {
//   from?: string; to?: string; toName?: string; tripType?: string; departure?: string;
//   returnDate?: string; travelers?: number; cabin?: string; airline?: string;
// }
export interface FlightSearchRequest {
  from: TravelAirport; to: TravelAirport; tripType: TripType;
  departureDate: string; returnDate: string; cabin: string; travelers: number;
  airline?: string;
}
export interface FlightSearchSummary extends Omit<FlightSearchRequest, 'from' | 'to'> {
  from: TravelAirport | null; to: TravelAirport | null; cabinLabel: string;
}
// export interface FlightLeg {
//   departureCode: string; arrivalCode: string;
//   departureTime: string; arrivalTime: string; departureDate: string;
//   duration: string; durationMinutes?: number; stops: number | string; flightNumber: string;
// }
// export interface Flight extends FlightLeg {
//   id: string; airlineName: string; airlineLogo?: string; cabin: string; baggage?: string;
//   price: number | string | null; currency: string; returnFlight: FlightLeg | null;
//   travelers?: number; pricePerTraveler?: number; demo?: boolean;
// }
// export type FlightMode = 'demo' | 'live' | 'unconfigured';
// export interface FlightSearchResponse {
//   configured: boolean; mode: FlightMode; results: Flight[]; message?: string;
// }
// function isRecord(value: unknown): value is Record<string, unknown> {
//   return typeof value === 'object' && value !== null;
// }
// function isTravelAirport(value: unknown): value is TravelAirport {
//   return isRecord(value) && typeof value.code === 'string' && Boolean(value.code)
//     && typeof value.name === 'string' && typeof value.city === 'string' && typeof value.country === 'string';
// }
// export function isFlightSearchRequest(value: unknown): value is FlightSearchRequest {
//   return isRecord(value) && isTravelAirport(value.from) && isTravelAirport(value.to)
//     && (value.airline === undefined || typeof value.airline === 'string')
//     && (value.tripType === 'one-way' || value.tripType === 'round-trip')
//     && typeof value.departureDate === 'string' && Boolean(value.departureDate)
//     && typeof value.returnDate === 'string' && typeof value.cabin === 'string'
//     && typeof value.travelers === 'number' && Number.isInteger(value.travelers) && value.travelers > 0;
// }

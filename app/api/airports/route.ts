import { searchAirports } from "@/lib/airports";

const responseHeaders = {
  "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";

  if (query.length > 80) {
    return Response.json(
      { error: "Search text must be 80 characters or fewer." },
      { status: 400, headers: responseHeaders },
    );
  }

  const requestedLimit = Number(url.searchParams.get("limit") ?? 8);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(Math.trunc(requestedLimit), 1), 10)
    : 8;

  return Response.json(
    { airports: searchAirports(query, limit) },
    { headers: responseHeaders },
  );
}
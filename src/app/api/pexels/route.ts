import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (!q) return NextResponse.json({ error: "Missing query" }, { status: 400 });

  const API_KEY = process.env.PEXELS_API_KEY;
  if (!API_KEY) return NextResponse.json({ error: "Server missing PEXELS_API_KEY" }, { status: 500 });

  const params = new URLSearchParams({ query: q, per_page: "30", page: "1" });
  const r = await fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
    headers: { Authorization: API_KEY },
  });

  const text = await r.text();
  return new NextResponse(text, { status: r.status, headers: { "content-type": "application/json" } });
}

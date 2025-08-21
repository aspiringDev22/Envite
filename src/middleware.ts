import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// IMPORTANT: server-only var. DO NOT prefix with NEXT_PUBLIC
const JWT_SECRET = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);

// Public routes whitelist
const PUBLIC = ["/login", "/register", "/_next", "/favicon.ico", "/api/public"];

function isPublic(pathname: string) {
  return PUBLIC.some((p) => pathname === p || pathname.startsWith(p));
}

function getAccessTokenFromCookies(req: NextRequest): string | null {
  const ref = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF; 
  const sessionCookieName = ref ? `sb-${ref}-auth-token` : undefined;
  const rawSession = sessionCookieName ? req.cookies.get(sessionCookieName)?.value : undefined;

  if (rawSession) {
    try {
      const raw = rawSession.startsWith("base64-") ? rawSession.slice("base64-".length) : rawSession;
      const decoded = Buffer.from(raw, "base64").toString("utf8");
      const parsed = JSON.parse(decoded);
      if (parsed?.access_token && typeof parsed.access_token === "string") {
        return parsed.access_token;
      }
    } catch {
      console.log("Error decoding base64 session cookie");
    }
    try {
      const parsed = JSON.parse(rawSession);
      if (parsed?.access_token && typeof parsed.access_token === "string") {
        return parsed.access_token;
      }
    } catch {
      console.log("Error parsing session cookie");
    }
  }

  const direct = req.cookies.get("sb-access-token")?.value;
  if (direct) return direct;

  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public/unprotected paths
  if (isPublic(pathname)) return NextResponse.next();

  const accessToken = getAccessTokenFromCookies(req);

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jose.jwtVerify(accessToken, JWT_SECRET, {
      clockTolerance: 5,
    });
    return NextResponse.next();
  } catch (err: any) {
    const msg = String(err?.message || err);
    const isExpired = /exp|expired/i.test(msg);
    if (isExpired) {
      const refreshUrl = new URL("/api/auth/refresh", req.url);
      refreshUrl.searchParams.set("redirect", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(refreshUrl);
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*"],
};

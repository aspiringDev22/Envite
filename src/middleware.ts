import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Get the access token from cookies - Supabase stores it differently now
  let accessToken: any;
  
  // Try the new format first (direct access token)
  accessToken = req.cookies.get(`sb-abcd-auth-token.0`)?.value;
  console.log("Access Token (new format):", accessToken);
  if (!accessToken) {
    // Try the session cookie format
    const sessionCookie = req.cookies.get(`sb-abcd-auth-token`)?.value;
    console.log("Session Cookie (old format):", sessionCookie);
    if (sessionCookie) {
      try {
        // Try parsing as direct JSON (new format)
        const parsed = JSON.parse(sessionCookie);
        accessToken = parsed?.access_token;
      } catch {
        try {
          // Try base64 decoding (old format)
          const decoded = Buffer.from(sessionCookie, "base64").toString("utf8");
          const parsed = JSON.parse(decoded);
          accessToken = parsed?.access_token;
        } catch (err) {
          console.error("Failed to parse session cookie:", err);
        }
      }
    }
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify JWT locally (this is the whole point!)
    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
    const { payload } = await jose.jwtVerify(accessToken, secret);

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const redirectTo = req.nextUrl.searchParams.get("redirect") || "/";

  const supabase =  await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session?.access_token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.redirect(new URL(redirectTo, req.url));
}

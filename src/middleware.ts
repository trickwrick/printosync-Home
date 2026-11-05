import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Redirect www.printosync.com -> printosync.com
  if (host.startsWith("www.")) {
    const nonWwwHost = host.replace(/^www\./, "");
    const url = request.nextUrl.clone();
    url.host = nonWwwHost;
    url.protocol = "https";
    return NextResponse.redirect(url.toString(), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except internal static assets
     */
    "/((?!_next/static|_next/image).*)",
  ],
};


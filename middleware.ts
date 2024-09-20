import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const geoInfo = {
    ip: request.ip,
    ...request.geo,
  };

  response.cookies.set("userGeoIP", JSON.stringify(geoInfo));

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */

    // Bypass rerendering when fetching GitHub repos.
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
      missing: [{ type: "header", key: "accept" }],
    },
  ],
};

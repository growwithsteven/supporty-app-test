import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  const defaultLocale =
    request.headers.get("x-your-custom-locale") ||
    request.nextUrl.locale ||
    "en";

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/(ko|en)/:path*",
  ], // At this line, define into the matcher all the availables language you have defined into routing.ts
};

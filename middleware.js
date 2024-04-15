//this middleware allows only authorized domains to use iframe to embed this site
import { NextResponse } from "next/server";
export const config = {
  matcher: ["/embedded-site/:path*"],
};

// List of authorized domains
const authorizedDomains = ["main--effortless-sopapillas-c336b4.netlify.app"];

export async function middleware(request) {
  // Retrieve the referrer URL or origin domain
  const referrerUrl = request.headers.get("referer");
  const originDomain = request.headers.get("origin");
  const domain = request.nextUrl.hostname;
  // Check if the referrer URL or origin domain is authorized
  let isAuthorized = false;

  for (const domain of authorizedDomains) {
    if (referrerUrl?.includes(domain) || originDomain?.includes(domain)) {
      isAuthorized = true;
      break;
    }
  }

  // If the referrer or origin is not authorized, reject the request
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  // If the referrer or origin is authorized, return the page content
  return NextResponse.next();
}

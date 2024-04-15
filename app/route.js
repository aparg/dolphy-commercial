import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";
import { NextResponse } from "next/server";
// List of authorized domains
const authorizedDomains = ["127.0.0.1:5500", "localhost:4000"];

export async function GET(request) {
  // Retrieve the referrer URL or origin domain
  const referrerUrl = request.headers.get("referer");
  const originDomain = request.headers.get("origin");

  const currentPath = request.nextUrl.pathname;
  const domain = request.nextUrl.hostname;
  console.log(referrerUrl);
  console.log(domain);

  // Check if the referrer URL or origin domain is authorized
  let isAuthorized = false;

  for (const domain of authorizedDomains) {
    if (referrerUrl?.includes(domain) || originDomain?.includes(domain)) {
      isAuthorized = true;
      break;
    }
  }

  // If the referrer or origin is not authorized, reject the request
  if (currentPath.includes("/embedded-site")) {
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // If the referrer or origin is authorized, return the page content
    return NextResponse.redirect(
      new URL("/embedded-site/ontario", request.nextUrl)
    );
  }
}

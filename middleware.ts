import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";
  const { pathname } = request.nextUrl;

  // If user is not authenticated and trying to access protected routes
  if (!isAuthenticated && (pathname.startsWith("/dashboard") || pathname.startsWith("/otp"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and trying to access auth routes
  if (isAuthenticated && (pathname === "/login" || pathname === "/otp")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/otp"],
}; 
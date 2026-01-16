import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get("admin")?.value === "true";
  const pathname = request.nextUrl.pathname;

  // Protect dashboard
  if (pathname.startsWith("/dashboard") && !isAdmin) {
    return NextResponse.redirect(
      new URL("/admin-login", request.url)
    );
  }

  // Prevent logged-in admin from seeing login page
  if (pathname === "/admin-login" && isAdmin) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-login"],
};

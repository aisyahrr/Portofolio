import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/playlist") ||
    pathname.startsWith("/achievements")
  ) {
    return NextResponse.next();
  }

  const isAdmin = request.cookies.get("admin")?.value === "true";

  if (pathname.startsWith("/dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  if (pathname === "/admin-login" && isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

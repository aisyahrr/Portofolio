import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const cookie = request.cookies.get("admin");
    const isAdmin = cookie?.value === "true";

    if (pathname.startsWith("/dashboard") && !isAdmin) {
      return NextResponse.redirect(
        new URL("/admin-login", request.url)
      );
    }

    if (pathname === "/admin-login" && isAdmin) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-login"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getApiBase } from "@/lib/api-base";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    try {
      const res = await fetch(`${getApiBase()}/admin/me`, {
        headers: { Cookie: request.headers.get("cookie") ?? "" },
      });
      if (!res.ok) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

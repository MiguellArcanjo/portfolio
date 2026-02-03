import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProduction = process.env.NODE_ENV === "production";

export function middleware(request: NextRequest) {
  // Em produção, bloquear acesso ao painel admin e às APIs admin
  if (isProduction) {
    const path = request.nextUrl.pathname;
    if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
      return new NextResponse(null, { status: 404 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const secret = new TextEncoder().encode("supersecretkey");

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname.startsWith("/login");
  const isDashboardPage = pathname.startsWith("/");

  if (isLoginPage) {
    if (token) {
      try {
        await jose.jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch {
        const res = NextResponse.next();
        res.cookies.delete("token");
        return res;
      }
    }
    return NextResponse.next();
  }

  if (isDashboardPage) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      await jose.jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("token");
      return res;
    }
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

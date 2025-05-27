import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("user_role")?.value;
  const path = req.nextUrl.pathname;

  const isPublic = publicRoutes.some((route) => path.startsWith(route));

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isPublic) {
    if (role === "User") {
      return NextResponse.redirect(new URL("/user/articles", req.url));
    }

    if (role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

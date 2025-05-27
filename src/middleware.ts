import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/login", "/register"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value
  const role = req.cookies.get("user_role")?.value
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route))

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (token && isPublic) {
    if (role === "User") {
      return NextResponse.redirect(new URL("/user/home", req.url))
    }

    if (role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

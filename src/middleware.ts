import { jwtVerify } from "jose"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/login", "/register"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get("token")?.value
  const user = req.cookies.get("user")?.value
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route))

  let role: string | null = null

  if (user) {
    try {
      const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET || "JWT_SECRET"
      const { payload } = await jwtVerify(
        user,
        new TextEncoder().encode(secretKey)
      )
      role = (payload as { role: string }).role
    } catch {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  if (!token && !user && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (token && isPublic && role) {
    if (role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    } else if (role === "User") {
      return NextResponse.redirect(new URL("/user/home", req.url))
    }
  }

  if (token && role) {
    if (pathname.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/user/home", req.url))
    }
    if (pathname.startsWith("/user") && role !== "User") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
}

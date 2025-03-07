import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest): NextResponse {
  // Get token from cookie
  const token = request.cookies.get('auth-token')?.value

  // Check if the path is an admin route
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

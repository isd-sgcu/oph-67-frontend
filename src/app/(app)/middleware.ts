import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || path === '/register'

  const authToken = request.cookies.get('auth-token')?.value

  if (!isPublicPath && !authToken) {
    const url = new URL('/register', request.url)

    url.searchParams.set('callbackUrl', encodeURI(request.url))

    return NextResponse.redirect(url)
  }

  if (authToken && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/(app)/:path*', '/', '/register'],
}

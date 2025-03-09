import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest): NextResponse {
  const authToken = request.cookies.get('auth-token')?.value

  if (!authToken) {
    const url = new URL('/3a9805a5/profile/register', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/3a9805a5/:path*',
    '/(admin)/:path*',
    '/((?!3a9805a5/profile/register|_next/static|_next/image|favicon.ico|assets).*)3a9805a5/:path*',
  ],
}

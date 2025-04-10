import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// TODO: remove this when full version available
const blockedPaths = [
  '/navigator',
  '/event',
  '/faculties',
  '/profile/certificate',
]

export function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/' || path === '/register'
  const userToken = request.cookies.get('auth-token')?.value

  if (!isPublicPath && !userToken) {
    const url = new URL('/register', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  if (userToken && path === '/register') {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl')
    if (callbackUrl) {
      return NextResponse.redirect(new URL(decodeURI(callbackUrl), request.url))
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  // TODO: remove this when full version available
  if (blockedPaths.includes(path)) {
    return NextResponse.redirect(new URL('/coming-soon', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/register',
    // TODO: remove this when full version available
    '/navigator',
    '/event',
    '/faculties',
    '/profile/certificate',
  ],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const blockedPaths = [
  '/navigator',
  '/event',
  '/faculties',
  '/workshop',
  '/pick-your-flower',
]

export function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname

  const isAdminRoute = path.startsWith('/3a9805a5')

  if (isAdminRoute) {
    const adminToken = request.cookies.get('admin-token')?.value

    if (path === '/3a9805a5/profile/register') {
      return NextResponse.next()
    }

    if (!adminToken) {
      const url = new URL('/3a9805a5/profile/register', request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }
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

  if (blockedPaths.includes(path)) {
    return NextResponse.redirect(new URL('/notyet', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
    '/3a9805a5/:path*',
    '/',
    '/register',
    '/navigator',
    '/event',
    '/faculties',
    '/workshop',
    '/pick-your-flower',
  ],
}

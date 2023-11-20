import { NextResponse } from 'next/server'

const GUEST_PATHS = [
  '/login',
  '/register',
  '/'
];

export function middleware(request) {
  const token = request.cookies.get('token')
  const url = request.nextUrl;

  const isGuestPath = GUEST_PATHS.some((path) => url.pathname === path);

  if (isGuestPath && token && url.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isGuestPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/books/:path*'
  ]
}
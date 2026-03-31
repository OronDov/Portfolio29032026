import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = req.nextUrl

  // Allow auth routes, static files, and all finance routes through
  if (
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/_next') ||
        pathname === '/login' ||
        pathname === '/favicon.ico' ||
        pathname.startsWith('/finance')
      ) {
        return NextResponse.next()
  }

  // If not logged in, redirect to login page
  if (!token) {
        const loginUrl = new URL('/login', req.url)
        return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

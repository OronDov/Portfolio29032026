export { default } from 'next-auth/middleware'

export const config = {
  // Protect everything EXCEPT the login page and NextAuth API routes
  matcher: ['/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)'],
}

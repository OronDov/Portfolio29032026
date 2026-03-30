import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const authorizedEmail = process.env.AUTH_EMAIL
        const authorizedPassword = process.env.AUTH_PASSWORD

        if (
          credentials?.email === authorizedEmail &&
          credentials?.password === authorizedPassword
        ) {
          return { id: '1', email: authorizedEmail, name: 'Authorized User' }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

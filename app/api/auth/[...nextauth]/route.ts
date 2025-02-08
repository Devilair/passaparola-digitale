import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credenziali',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Per ora ritorniamo un utente mock
        if (credentials?.email === "test@test.com" && credentials?.password === "test") {
          return {
            id: "1",
            name: "Test User",
            email: "test@test.com"
          }
        }
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };

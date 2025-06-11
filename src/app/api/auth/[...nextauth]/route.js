import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Correo o Usuario", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:3001/api/members/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials?.identifier,  
              password: credentials?.password,
            }),

          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Error de autenticación");
          }

          return {
            id: data.user.id,
            name: data.user.nombre,
            email: data.user.email,
            role: data.user.rol,
          };
        } catch (err) {
          throw new Error(err.message || "Error en el servidor");

        }
      }

    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2,
    updateAge: 60 * 15,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

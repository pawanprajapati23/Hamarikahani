import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebaseAdmin";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@hamarikahani.in" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const snapshot = await db.collection('adminUsers').where('email', '==', credentials.email).limit(1).get();
        let user: any = null;
        if (!snapshot.empty) {
          user = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        }

        if (!user) {
          // Fallback to env admin if DB is empty for initial setup
          if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
            // Auto seed the DB with this first admin
            const hashedPwd = await bcrypt.hash(credentials.password, 10);
            const newAdminRef = await db.collection('adminUsers').add({
              email: credentials.email,
              password: hashedPwd
            });
            return { id: newAdminRef.id, email: credentials.email };
          }
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    }
  }
};

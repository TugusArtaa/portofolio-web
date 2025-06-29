import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  // Konfigurasi provider autentikasi
  providers: [
    // Provider GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // Provider login dengan email dan password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validasi input email dan password
        if (!credentials?.email || !credentials.password) return null;

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Jika user tidak ditemukan atau tidak ada password
        if (!user || !user.password) return null;

        // Cek kecocokan password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Return data user jika valid
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/sso/safe-access-admin-entry/A7kz9QpL",
  },
  callbacks: {
    // Callback saat proses signIn
    async signIn({ user, account, profile }) {
      try {
        // Hanya izinkan user tertentu untuk login via GitHub
        if (account?.provider === "github") {
          const allowedGithubUsers = ["TugusArtaa", "2215323039@pnb.ac.id"];

          const isAllowed =
            allowedGithubUsers.includes(user.email!) ||
            allowedGithubUsers.includes(
              (profile as { login?: string })?.login!
            );

          if (!isAllowed) {
            console.log(
              "GitHub user not allowed:",
              user.email,
              (profile as { login?: string })?.login
            );
            return false;
          }

          // Sinkronisasi user GitHub ke database (upsert)
          try {
            await prisma.user.upsert({
              where: { email: user.email! },
              update: {
                name: user.name,
                image: user.image,
              },
              create: {
                email: user.email!,
                name: user.name,
                image: user.image,
              },
            });
          } catch (dbError) {
            console.error("Database error:", dbError);
            return false;
          }
        }
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    // Callback untuk menambah id user ke session
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    // Callback untuk menambah id user ke JWT token
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

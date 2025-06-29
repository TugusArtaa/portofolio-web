import NextAuth from "next-auth";

// Deklarasi ekstensi tipe untuk modul next-auth
declare module "next-auth" {
  // Struktur data session yang digunakan aplikasi
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  // Struktur data user yang digunakan aplikasi
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// Ekstensi tipe untuk JWT (JSON Web Token)
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

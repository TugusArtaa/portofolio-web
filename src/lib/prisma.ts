import { PrismaClient } from "@prisma/client";

// Menyimpan instance PrismaClient secara global agar tidak duplikat saat development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Membuat instance PrismaClient (log query untuk debugging)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

// Hanya pada mode development, simpan instance di global
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

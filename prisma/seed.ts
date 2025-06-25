import { prisma } from "../src/lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const hashedPassword = await hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@email.com",
      password: hashedPassword,
    },
  });
}

main().then(() => {
  console.log("✅ Admin created");
  process.exit(0);
});

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      password: hashedPassword,
      role: "admin",
    },
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {
      password: hashedPassword,
      role: "user",
    },
    create: {
      name: "John Doe",
      email: "customer@example.com",
      password: hashedPassword,
      role: "user",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

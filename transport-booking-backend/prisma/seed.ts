import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@transport.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  await prisma.user.create({
    data: {
      firstName: "System",
      lastName: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });

  console.log("Admin seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();
export const auth = betterAuth({
  emailAndPassword: { enabled: true },
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
});

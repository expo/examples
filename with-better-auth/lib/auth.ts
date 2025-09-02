import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [expo()],
  socialProviders: {},
  trustedOrigins: ["exp://", "withbetterauth://"],
  logger: {
    log: (level, message, ...args) => {
      console.log(`${level}: ${message}`);
      console.log(JSON.stringify(args, null, 2));
    },
  },
});

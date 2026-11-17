import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { PrismaClient } from "@prisma/client";
import { mockGitHub } from "@mockatoo/connect-better-auth";

const prisma = new PrismaClient();

const github = {
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
};
// Outside production, GitHub sign-in goes to Mockatoo, a hosted mock that needs no GitHub app.
const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [expo(), ...(isProduction ? [] : [mockGitHub(github)])],
  socialProviders: isProduction ? { github } : {},
  trustedOrigins: ["exp://", "withbetterauth://"],
  logger: {
    log: (level, message, ...args) => {
      console.log(`${level}: ${message}`);
      console.log(JSON.stringify(args, null, 2));
    },
  },
});

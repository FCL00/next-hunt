import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@/lib/generated/prisma/client';
import { sendForgotPasswordEmail, sendVerificationEmail, sendWelcomeEmail } from '@/lib/email';
import { headers } from 'next/headers';
import { env } from '@/lib/env/server';

const adapter = new PrismaMariaDb({
  host: env.DATABASE_HOST_NAME,
  port: env.DATABASE_PORT,
  connectionLimit: 5,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
});

export const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      void sendForgotPasswordEmail({ email: user.email, name: user.name, url });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void sendVerificationEmail({ email: user.email, name: user.name, url });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  // NOTE: currently not available in local
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          void sendWelcomeEmail({
            email: user.email,
            name: user.name,
          });
        },
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'mysql', // or "mysql", "postgresql", ...etc
  }),
});

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@/lib/generated/prisma/client';


const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST_NAME as string,
  port: parseInt(process.env.DATABASE_PORT as string),
  connectionLimit: 5,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string, 
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
  //   }
  // },
  database: prismaAdapter(prisma, {
    provider: 'mysql', // or "mysql", "postgresql", ...etc
  }),
});
import 'server-only';
import { z } from 'zod';

const createEnv = () => {
  const serverEnvSchema = z.object({
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string(),
    DATABASE_HOST_NAME: z.string().min(1),
    DATABASE_PORT: z.coerce.number().default(3306),
    DATABASE_USER: z.string().min(1),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string().min(1),
    DATABASE_URL: z.string(),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    JOB_SEARCH_API_URL: z.string().default('http://localhost:8000'),
    JOB_SEARCH_API_KEY: z.string().min(1),
    JOB_SEARCH_API_HOST: z.string().min(1),
    GOOGLE_GEMINI_API_KEY: z.string().min(1),
  });
  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    throw new Error(`Invalid server environment variables: ${Object.keys(fieldErrors).join(', ')}`);
  }
  return result.data;
};

export const env = createEnv();

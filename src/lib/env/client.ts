import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_ENABLE_API_MOCKING: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true'),

  NEXT_PUBLIC_MOCK_API_PORT: z.coerce.number().default(8080),
});

const clientEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_ENABLE_API_MOCKING: process.env.NEXT_PUBLIC_ENABLE_API_MOCKING,
  NEXT_PUBLIC_MOCK_API_PORT: process.env.NEXT_PUBLIC_MOCK_API_PORT,
};

const result = clientEnvSchema.safeParse(clientEnv);

if (!result.success) {
  const { fieldErrors } = z.flattenError(result.error);

  throw new Error(
    `Invalid client environment variables:\n${Object.entries(fieldErrors)
      .map(([key, errors]) => `${key}: ${errors?.join(', ')}`)
      .join('\n')}`,
  );
}

export const env = result.data;
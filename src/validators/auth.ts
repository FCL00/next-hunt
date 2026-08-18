import { z } from 'zod';

export const signInInputSchema = z.object({
  email: z.email('Invalid Email'),
  password: z.string().min(1, 'Password is required'),
});

export const signUpInputSchema = z
  .object({
    name: z.string().min(1, 'username is required'),
    email: z.email('Invalid email'),
    password: z
      .string({ message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters!' })
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Password must contain at least one number',
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: 'Password must contain at least one special symbol',
      }),
    confirmPassword: z.string({ message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;

export type SignInInput = z.infer<typeof signInInputSchema>;

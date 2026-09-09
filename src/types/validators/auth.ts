import { z } from 'zod';
import { type TranslationValues } from 'next-intl';

const errors = [
  'errors-username-invalid',
  'errors-username-required',
  'errors-email-invalid',
  'errors-email-required',
  'errors-password-required',
  'errors-password-min',
  'errors-password-uppercase',
  'errors-password-number',
  'errors-password-symbol',
  'errors-password-confirm',
  'errors-password-not-match',
] as const;

export type AuthErrorMessages = (typeof errors)[number];

export const signInInputSchema = (t: (key: AuthErrorMessages) => string) => {
  return z.object({
    email: z.email({ message: t('errors-email-invalid') }),
    password: z.string().min(1, { message: t('errors-password-required') }),
  });
};

export const signUpInputSchema = (t: (key: AuthErrorMessages, values?: TranslationValues) => string) => {
  return z
    .object({
      name: z.string().min(1, { message: t('errors-username-required') }),
      email: z.email({ message: t('errors-email-invalid') }),
      password: z
        .string({ message: t('errors-password-required') })
        .min(8, { message: t('errors-password-min', { min: 8 }) })
        .refine((val) => /[A-Z]/.test(val), {
          message: t('errors-password-uppercase'),
        })
        .refine((val) => /[0-9]/.test(val), {
          message: t('errors-password-number'),
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
          message: t('errors-password-symbol'),
        }),
      confirmPassword: z.string({ message: t('errors-password-confirm') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors-password-not-match'),
      path: ['confirmPassword'],
    });
};

export const forgotPasswordInputSchema = (t: (key: AuthErrorMessages) => string) => {
  return z.object({
    email: z.email('errors-email-invalid'),
  });
};

export const resetPasswordInputSchema = (t: (key: AuthErrorMessages, values?: TranslationValues) => string) => {
  return z.object({
    password: z
      .string({ message: t('errors-password-required') })
      .min(8, { message: t('errors-password-min', { min: 8 }) })
      .refine((val) => /[A-Z]/.test(val), {
        message: t('errors-password-uppercase'),
      })
      .refine((val) => /[0-9]/.test(val), {
        message: t('errors-password-number'),
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: t('errors-password-symbol'),
      }),
    confirmPassword: z.string({ message: t('errors-password-confirm') }),
  });
};

export type SignUpInput = z.infer<ReturnType<typeof signUpInputSchema>>;
export type SignInInput = z.infer<ReturnType<typeof signInInputSchema>>;
export type ForgotInput = z.infer<ReturnType<typeof forgotPasswordInputSchema>>;
export type ResetPasswordInput = z.infer<ReturnType<typeof resetPasswordInputSchema>>;

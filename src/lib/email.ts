import { resend } from '@/lib/resend';
import { ForgotPasswordEmail, WelcomeEmail, VerificationEmail } from '@/components/emails';

if (!process.env.NEXT_PUBLIC_APP_NAME) {
  throw new Error('Missing NEXT_PUBLIC_APP_NAME environment variable');
}
if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error('Missing NEXT_PUBLIC_APP_URL environment variable');
}

const appName = process.env.NEXT_PUBLIC_APP_NAME;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

interface SendEmailProps {
  email: string;
  name: string;
  url: string;
}

export const sendForgotPasswordEmail = async ({ email, name, url }: SendEmailProps) => {
  return resend.emails.send({
    from: `${appName} <onboarding@resend.dev>`,
    to: email,
    subject: 'Password Reset',
    react: ForgotPasswordEmail({ appName, name, url }),
  });
};

export const sendWelcomeEmail = async ({ email, name }: Omit<SendEmailProps, 'url'>) => {
  return resend.emails.send({
    from: `${appName} <onboarding@resend.dev>`,
    to: email,
    subject: `Welcome to ${appName}`,
    react: WelcomeEmail({ appName, name, url: `${appUrl}/dashboard` }),
  });
};

export const sendVerificationEmail = async ({ email, name, url }: SendEmailProps) => {
  return resend.emails.send({
    from: `${appName} <onboarding@resend.dev>`,
    to: email,
    subject: `Verify your ${appName} email address`,
    react: VerificationEmail({ appName, name, url }),
  });
};

import { createAuthClient } from 'better-auth/react';
import { env } from '@/lib/env/client';

const appUrl = env.NEXT_PUBLIC_APP_URL;

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL as string,
});

export const signInWithGithub = async () => {
  return await signIn.social({ provider: 'github', callbackURL: `${appUrl}/dashboard`});
}

export const { 
  signIn, 
  signUp, 
  useSession, 
  signOut, 
  requestPasswordReset, 
  resetPassword,
  getSession,
} = createAuthClient();


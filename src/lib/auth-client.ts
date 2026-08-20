import { createAuthClient } from 'better-auth/react';

if(!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error('Missing NEXT_PUBLIC_APP_URL environment variable');
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL as string,
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


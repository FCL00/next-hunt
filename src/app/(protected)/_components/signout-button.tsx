'use client';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';

export function SignOutButton() {
  const onSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect(paths.auth.signIn.getHref());
        },
      },
    });
  };

  return <Button onClick={onSignOut}>Sign-Out</Button>;
}

'use client';
import { signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { paths } from '@/config/paths';

export default function page() {
  const router = useRouter();
  const onSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace(paths.auth.signIn.getHref());
        },
      },
    });
  };

  return (
    <div>
      Welcome to dashboard page
      <Button onClick={onSignOut}>Sign Out</Button>
    </div>
  );
}

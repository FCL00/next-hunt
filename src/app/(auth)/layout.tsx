import { AuthLayout } from './_components/auth-layout';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (session) {
    redirect(paths.dashboard.app.getHref());
  }

  return <AuthLayout>{children}</AuthLayout>;
}

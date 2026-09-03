import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';
import { getSession } from '@/lib/auth';
import { DashboardLayout } from './_components/dashboard-layout';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect(paths.auth.signIn.getHref());
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

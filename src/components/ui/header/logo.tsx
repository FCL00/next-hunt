'use client';
import { useTranslations } from 'next-intl';
import { env } from '@/lib/env/client';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { Waypoints } from 'lucide-react';

export default function logo() {
  const t = useTranslations('common');
  return (
    <Link className="font-fraunces flex items-center gap-2 font-bold text-ink" href={paths.home.getHref()}>
      <Waypoints className="text-signal" />
      <span> {t('app.name', { name: env.NEXT_PUBLIC_APP_NAME })}</span>
    </Link>
  );
}

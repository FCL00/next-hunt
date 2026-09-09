import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Badge } from '@/components/ui/badge';
import { Terminal } from '@/components/ui/terminal';
import { ArrowRight } from 'lucide-react';
import { ContentLayout as Layout } from '@/components/layout/content-layout';
import { paths } from '@/config/paths';
import { useTranslations } from 'next-intl';
import { formatHTML } from '@/utils/sanitize';

export default function Home() {
  const t = useTranslations('common');
  return (
    <main>
      <Header />
      <Layout>
        <Badge className="mb-7 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-signal-400 pulse-dot"></span>
          {t('page.section.hero.kicker', { count: 12 })}
        </Badge>
        <h1 {...formatHTML(t.raw('page.section.hero.heading'))} />
        <p className="mb-9 max-w-lg">{t('page.section.hero.subHeading')}</p>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href={paths.auth.signIn.getHref()}>
              {t('page.section.hero.buttonCTA')}{' '}
              <span>
                <ArrowRight />
              </span>
            </Link>
          </Button>
        </div>
      </Layout>
      <Layout className="pt-0">
        <Terminal />
      </Layout>
    </main>
  );
}

import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Badge } from '@/components/ui/badge';
import { Terminal } from '@/components/ui/terminal';
import { ArrowRight } from 'lucide-react';
import { ContentLayout as Layout } from '@/components/layout/content-layout';
import { paths } from '@/config/paths';

export default function Home() {
  return (
    <main>
      <Header />
      <Layout>
        <Badge className="mb-7 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-signal-400 pulse-dot"></span>
          14 applications in motion right now
        </Badge>
        <h1>
          Every application, <br /> <span>exactly</span> where it stands.
        </h1>
        <p className="mb-9">
          NextHunt replaces the spreadsheet with a living pipeline so you always know what's applied, what's waiting on you, and
          what's gone quiet.
        </p>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href={paths.auth.signIn.getHref()}>
              Start Tracking - Free{' '}
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

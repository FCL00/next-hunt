import { Header } from '@/components/ui/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ContentLayout } from '@/components/layout/content-layout';
export default function Home() {
  return (
    <main>
      <Header />
      <ContentLayout>
        <Badge className="mb-7 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-signal-400 pulse-dot"></span>
          14 applications in motion right now
        </Badge>
        <h1>
          Every application, <br /> <span>exactly</span> where it stands.
        </h1>
        <p>
          Waypoint replaces the spreadsheet with a living pipeline so you always know what's applied, what's waiting on
          you, and what's gone quiet.
        </p>
        <div className="flex items-center gap-4">
          <Button>Start Tracking - Free</Button>
          <Button icon={<ArrowRight/>} iconPosition='right' variant="ghost" className="font-medium">
            See how it works
          </Button>
        </div>
      </ContentLayout>
    </main>
  );
}

import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';
import { Waypoints, ArrowRight } from 'lucide-react';
import { paths } from '@/config/paths';
import { getSession } from '@/lib/auth';

export async function Header() {
  const session = await getSession();
  return (
    <header className="border-b border-hairline sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(10,12,11,0.85)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-fraunces flex items-center gap-2">
          <Waypoints className="text-signal" />
          <span className="font-bold">NextHunt</span>
        </div>
        <div className="flex items-center gap-3">
          {!session?.user && <Link href={paths.auth.signIn.getHref()}>Sign-in</Link>}
          <Button className='hidden sm:flex' asChild>
            <Link href={session?.user ? paths.dashboard.app.getHref() : paths.auth.signIn.getHref()}>
              <div className="flex items-center gap-3">
                <span>Open Dashboard</span>
                <ArrowRight />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

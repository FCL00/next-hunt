import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { paths } from '@/config/paths';
import { getSession } from '@/lib/auth';
import Logo from './logo';
import { LanguageSelector  } from '@/components/LanguageSelector';
import { changeLocale } from '@/locales/action';

export async function Header() {
  const session = await getSession();
  return (
    <header className="border-b border-hairline sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(10,12,11,0.85)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo/>
        <div className="flex items-center gap-3 shrink-0">
          <Button className='hidden sm:flex' asChild>
            <Link href={session?.user ? paths.dashboard.app.getHref() : paths.auth.signIn.getHref()}>
              <div className="flex items-center gap-3">
                <span>{session?.user ? "Open Dashboard" : "Sign-in"}</span>
                <ArrowRight />
              </div>
            </Link>
          </Button>
          <LanguageSelector changeLocale={changeLocale}/>
        </div>
      </div>
    </header>
  );
}

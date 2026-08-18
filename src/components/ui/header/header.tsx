import { Button } from '@/components/ui/button';
import { Waypoints, LayoutDashboard } from 'lucide-react';

export function Header() {
  return (
    <header
      className="border-b border-hairline sticky top-0 z-50 backdrop-blur-md"
      style={{ background: 'rgba(10,12,11,0.85)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-fraunces flex items-center gap-2">
          <Waypoints className="text-signal" />
          <span>Waypoint</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[13.5px] text-ink-muted">
          <a href="#pipeline" className="hover:text-ink transition-colors">
            Pipeline
          </a>
          <a href="#features" className="hover:text-ink transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-ink transition-colors">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button className="text-[13.5px] hover:brightness-110 transition" icon={<LayoutDashboard />}>
            Open Dashboard
          </Button>
        </div>
      </div>
    </header>
  );
}

import { OverviewCard } from '@/features/dashboard/components/overview-cards';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { UpcomingEvent } from '@/features/dashboard/components/upcoming-events';
import { Dot } from '@/components/ui/dot';


export default function page() {
  return (
    <div className="p-6">
      <OverviewCard />
      {/* <UpcomingEvent /> */}
      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col">
          <div className="flex justify-between mb-4">
            <p className="font-mono text-xs text-dark-400">APPLIED</p>
            <Badge className="bg-dark-800 rounded-full px-2">14</Badge>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Hello World</CardTitle>
              <CardDescription>FrontEnd Engineer</CardDescription>
              <span className="text-xs font-mono text-ink-muted">2d's ago</span>
            </CardHeader>
          </Card>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between mb-4">
            <p className="font-mono text-xs text-dark-400">SCREENING</p>
            <Badge className="bg-dark-800 rounded-full px-2">9</Badge>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Hello World</CardTitle>
              <CardDescription>FrontEnd Engineer</CardDescription>
              <span className="text-xs font-mono text-ink-muted">2d's ago</span>
            </CardHeader>
          </Card>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-between mb-4">
            <div className="flex items-center gap-2">
              <Dot variant="success" />
              <p className="font-mono text-xs text-emerald-400">INTERVIEW</p>
            </div>
            <Badge variant="signal" className="rounded-full px-2">
              5
            </Badge>
          </div>
          <Card tone="active">
            <CardHeader>
              <CardTitle>Hello World</CardTitle>
              <CardDescription>FrontEnd Engineer</CardDescription>
              <span className="text-xs font-mono text-signal">2d's ago</span>
            </CardHeader>
          </Card>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between mb-4">
            <p className="font-mono text-xs text-dark-400">OFFER</p>
            <Badge className="bg-dark-800 rounded-full px-2">2</Badge>
          </div>
          <Card tone="success">
            <CardHeader>
              <CardTitle>Hello World</CardTitle>
              <CardDescription>FrontEnd Engineer</CardDescription>
              <span className="text-xs font-mono text-signal">2d's ago</span>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

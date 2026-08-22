import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const EvenItem = () => {
  return (
    <div className="flex gap-2 mb-4">
      <div className="w-9 h-9 rounded-md bg-dark-700 border border-dark-500 flex flex-col items-center justify-center leading-none shrink-0">
        <span className="text-[9px] font-mono text-ink-400">AUG</span>
        <span className="text-[12px] font-mono text-ink-400">19</span>
      </div>
      <div className="flex flex-col">
        <p className="text-xs text-ink">Figma final round</p>
        <p className="text-xs text-ink-muted">2:00 PM · with Priya</p>
      </div>
    </div>
  );
};

export function UpcomingEvent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        <EvenItem/>
        <EvenItem/>
        <EvenItem/>
      </CardContent>
    </Card>
  );
}

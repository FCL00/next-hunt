import {
  Card,
  CardContent,
} from '@/components/ui/card';

export function OverviewCard() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
      <Card>
        <CardContent>
          <p className="text-sm">Total application</p>
          <h3 className="text-2xl">32</h3>
          <p className="text-sm">+4 this week</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-sm">Active</p>
          <h3 className="text-2xl text-signal">12</h3>
          <p className="text-sm">in Screening or later</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-sm">Interviews this week</p>
          <h3 className="text-2xl">32</h3>
          <p className="text-sm">next: Figma, tomorrow</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-sm">Response Rate</p>
          <h3 className="text-2xl">38%</h3>
        </CardContent>
      </Card>
    </div>
  );
}

import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Dot } from '@/components/ui/dot';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const stages = [
  {
    status: 'applied',
    label: 'APPLIED',
    count: 14,
    tone: 'default',
  },
  {
    status: 'screening',
    label: 'SCREENING',
    count: 9,
    tone: 'default',
  },
  {
    status: 'interview',
    label: 'INTERVIEW',
    count: 5,
    tone: 'active',
  },
  {
    status: 'offer',
    label: 'OFFER',
    count: 2,
    tone: 'success',
  },
] as const;

type Stage = (typeof stages)[number];

function StageColumn({ stage }: { stage: Stage }) {
  const isActive = stage.tone === 'active';
  const isSuccess = stage.tone === 'success';

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex justify-between">
        <div className="flex items-center gap-2">
          {isActive && <Dot variant="success" />}

          <p
            className={cn(
              'font-mono text-xs text-dark-400',
              isActive && 'text-emerald-400',
            )}
          >
            {stage.label}
          </p>
        </div>

        <Badge
          variant={isActive ? 'signal' : 'default'}
          className="rounded-full px-2"
        >
          {stage.count}
        </Badge>
      </div>

      <Card tone={stage.tone}>
        <CardHeader>
          <CardTitle>Hello World</CardTitle>
          <CardDescription>FrontEnd Engineer</CardDescription>

          <span
            className={cn(
              'font-mono text-xs text-ink-muted',
              (isActive || isSuccess) && 'text-signal',
            )}
          >
            2d's ago
          </span>
        </CardHeader>
      </Card>
    </div>
  );
}

export function Stages() {
  return (
    <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((stage) => (
        <StageColumn key={stage.status} stage={stage} />
      ))}
    </div>
  );
}
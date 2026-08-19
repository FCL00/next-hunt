import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';

function Dots() {
  return (
    <>
      <div className="flex w-fit items-center gap-2">
        <span className="w-2.5 h-2.5 bg-hairline rounded-full"></span>
        <span className="w-2.5 h-2.5 bg-hairline rounded-full"></span>
        <span className="w-2.5 h-2.5 bg-hairline rounded-full"></span>
      </div>
      <span className="text-ink-muted">waypoint.app/pipeline</span>
    </>
  );
}

function TerminalGrid() {
  const terminalData = [
    {
      title: 'Applied',
      count: 6,
      data: [
        {
          title: 'Linear',
          position: 'Frontend Engineer',
          content: 'applied 2d ago',
          active: false,
        },
        {
          title: 'Vercel',
          position: 'Frontend Engineer',
          content: 'applied 5d ago',
          active: false,
        },
      ],
    },
    {
      title: 'Screening',
      count: 3,
      data: [
        {
          title: 'Notion',
          position: 'Frontend Engineer',
          content: 'recruiter call fri',
          active: false,
        },
      ],
    },
    {
      title: 'Interview',
      count: 2,
      data: [
        {
          title: 'Figma',
          position: 'Sr Frontend Eng',
          content: 'final round · tomorrow 2pm',
          active: true,
        },
      ],
    },
    {
      title: 'Offer',
      count: 1,
      data: [
        {
          title: 'Retool',
          position: 'Frontend Engineer',
          content: 'offer · respond by mon',
          active: true,
        },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-4 p-4 pt-2 w-full">
      {terminalData.map((column, index) => (
        <div className={`cols-${index} flex flex-col gap-2`} key={`${column.title}-${index}`}>
          <div className="flex items-center justify-between px-1 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">{column.title}</span>
            <span className="text-[11px] font-mono text-ink-muted">{column.count}</span>
          </div>
          {column.data.map((card, cardIndex) => (
            <TerminalCard
              key={`${card.title}-${cardIndex}`}
              title={card.title}
              position={card.position}
              content={card.content}
              active={card.active}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

type TerminalCardProps = {
  title: string;
  position: string;
  content: string;
  active?: boolean;
};

function TerminalCard({ title, position, content, active = false }: TerminalCardProps) {
  return (
    <Card className="rounded-sm" tone={active ? 'active' : 'subdued'}>
      <CardHeader className="gap-0">
        <CardTitle className="font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {position} <br /> {content}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function Terminal() {
  return (
    <Card className='p-0'>
      <CardHeader className="border-b border-b-hairline p-4">
        <CardTitle>
          <CardTitle className="flex gap-4">
            <Dots />
          </CardTitle>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TerminalGrid />
      </CardContent>
    </Card>
  );
}

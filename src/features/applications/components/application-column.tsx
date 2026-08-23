import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type Application, ApplicationStage } from '@/validators/application';
import { ApplicationDropdownMenu as Menu } from './application-dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

type ApplicationColumnProps = {
  stage: ApplicationStage;
  applications: Application[];
};

export function ApplicationColumn({ stage, applications }: ApplicationColumnProps) {
  const stageApplication = applications.filter((application) => application.state === stage);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <p className="font-mono text-xs text-dark-400">{stage}</p>
        <Badge className="bg-dark-800 rounded-full px-2">{stageApplication.length}</Badge>
      </div>
      <ScrollArea className='max-h-150'>
        {stageApplication.map((application) => (
          <Card className="relative mb-4" key={application.id}>
            <CardHeader>
              <CardTitle>{application.company}</CardTitle>
              <CardDescription>{application.role}</CardDescription>
              <span className="text-xs font-mono text-ink-muted">{application.salary}</span>
              <div className="absolute top-1 right-2">
                <Menu applicationId={application.id} currentStage={application.state} />
              </div>
            </CardHeader>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}

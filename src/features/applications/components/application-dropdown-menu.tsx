import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { ApplicationStage } from '@/validators/application';
import { useUpdateApplicationStage } from '../hooks/use-application';

type ApplicationDropdownMenuProps = {
  applicationId: string;
  currentStage: ApplicationStage;
};

export function ApplicationDropdownMenu({ currentStage, applicationId }: ApplicationDropdownMenuProps) {
  const stages: ApplicationStage[] = ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED'];
  const filterStage = stages.filter((stage) => stage !== currentStage);
  const updateState = useUpdateApplicationStage();
  const onChangeStage = async (state: ApplicationStage) => {
    updateState.mutate({ applicationId: applicationId, state: state });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="text-xs cursor-pointer hover:bg-dark-700 text-ink-muted" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-mono text-ink-muted text-xs">MOVE TO</DropdownMenuLabel>
        {filterStage.map((stage, index) => (
          <DropdownMenuItem className="lowercase" key={`${stage} + ${index}`} onSelect={() => onChangeStage(stage)}>
            {stage}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-mono text-ink-muted text-xs">Actions</DropdownMenuLabel>
        <DropdownMenuItem className="text-xs">Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

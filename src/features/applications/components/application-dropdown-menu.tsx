import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { type ApplicationStage } from '@/types/validators/application';
import { useUpdateApplicationStage } from '../hooks/use-application';

type ApplicationDropdownMenuProps = {
  applicationId: string;
  currentStage: ApplicationStage;
  onEdit: () => void;
  onDelete: () => void;
};

export function ApplicationDropdownMenu({ currentStage, applicationId, onEdit, onDelete }: ApplicationDropdownMenuProps) {
  const stages: ApplicationStage[] = ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED'];
  const filterStage = stages.filter((stage) => stage !== currentStage);
  const updateState = useUpdateApplicationStage();
  
  const onChangeStage = async (state: ApplicationStage) => {
    updateState.mutate({ applicationId: applicationId, state: state });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <Ellipsis className="cursor-pointer text-xs text-ink-muted hover:bg-dark-700" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-mono text-xs text-ink-muted">MOVE TO</DropdownMenuLabel>
        {filterStage.map((stage) => (
          <DropdownMenuItem key={stage} onSelect={() => onChangeStage(stage)}>
            <span className="capitalize-first">{stage}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-mono text-xs text-ink-muted">ACTIONS</DropdownMenuLabel>
        <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-400" onSelect={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

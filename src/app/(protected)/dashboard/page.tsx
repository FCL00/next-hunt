
import { OverviewCard } from '@/features/dashboard/components/overview-cards';
import { ApplicationBoard } from '@/features/applications/components/application-board';

export default function page() {
  return (
    <div className="p-6">
      <OverviewCard />
      <ApplicationBoard />
    </div>
  );
}

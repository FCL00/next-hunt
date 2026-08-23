
import { Plus, Waypoints } from 'lucide-react';
import { SideBar } from '@/features/dashboard/components/sidebar';
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-dashboard">
      <div className="left border-r border-dark-500 min-h-screen">
        <div className="p-4 border-b border-dark-500">
          <div className="flex items-center gap-2 mx-auto">
            <Waypoints />
            <h3 className="text-2xl">NextHunt</h3>
          </div>
        </div>
        <SideBar />
      </div>
      <div className="right">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

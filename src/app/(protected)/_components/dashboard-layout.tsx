import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/forms';
import { Plus, Waypoints } from 'lucide-react';
import { ApplicationForm as CreateForm } from '@/features/dashboard/components/application-form';
import { SideBar } from '@/features/dashboard/components/sidebar';

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
        <div className="p-4 border-b border-dark-500 flex justify-end">
          <div className="flex items-center max-w-lg gap-2 w-full">
            <Input
              className="h-8 px-3.5 text-xs"
              type="text"
              placeholder="Search applications"
            />
            <CreateForm />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

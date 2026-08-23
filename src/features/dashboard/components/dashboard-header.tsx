'use client';
import { Input } from '@/components/ui/forms';
import { Button } from '@/components/ui/button/button';
import { ApplicationForm as CreateForm } from '@/features/applications/components/application-form';
import { usePathname } from 'next/navigation';
import { paths } from '@/config/paths';

export function DashboardHeader() {
  const pathName = usePathname();
  return (
    <>
      {pathName === paths.dashboard.app.getHref() && (
        <div className="p-4 border-b border-dark-500 flex justify-end">
          <div className="flex items-center max-w-lg gap-2 w-full">
            <Input className="h-8 px-3.5 text-xs" type="text" placeholder="Search applications" />
            <CreateForm />
          </div>
        </div>
      )}
      {pathName === paths.dashboard.jobs.getHref() && (
        <div className="p-5 border-b border-dark-500">
          <h3 className="">Job Search</h3>
        </div>
      )}
      {pathName === paths.dashboard.resume.getHref() && (
        <div className="p-5 border-b border-dark-500">
          <h3 className="">Resume Builder</h3>
        </div>
      )}
      {pathName === paths.dashboard.profile.getHref() && (
        <div className="p-5 border-b border-dark-500">
          <h3 className="">Profile</h3>
        </div>
      )}
      {pathName === paths.dashboard.settings.getHref() && (
        <div className="p-5 border-b border-dark-500">
          <h3 className="">Settings</h3>
        </div>
      )}
    </>
  );
}

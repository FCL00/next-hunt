'use client';
import { Input } from '@/components/ui/forms';
import { ApplicationForm as CreateForm } from '@/features/applications/components/application-form';
import { usePathname } from 'next/navigation';
import { paths } from '@/config/paths';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui/modal';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function DashboardHeader() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {pathName === paths.dashboard.app.getHref() && (
        <div className="p-4 border-b border-dark-500 flex justify-end">
          <div className="flex items-center max-w-lg gap-2 w-full">
            <Input className="h-8 px-3.5 text-xs" type="text" placeholder="Search applications" />
            <Button size="sm" icon={<Plus />} iconPosition="left" onClick={() => setOpen(true)}>
              New Application
            </Button>
            <Modal open={open} onOpenChange={() => setOpen((prev) => !prev)}>
              <ModalContent>
                <ModalHeader>
                  <ModalDescription>Track a new job application</ModalDescription>
                  <ModalTitle>New Application</ModalTitle>
                </ModalHeader>
                <CreateForm onCancel={() => setOpen(false)} onSuccess={() => setOpen(false)}/>
              </ModalContent>
            </Modal>
          </div>
        </div>
      )}
      {pathName === paths.dashboard.jobs.getHref() && (
        <div className="p-5 border-b border-dark-500 flex items-center justify-between">
          <h3 className="font-fraunces">Job Search</h3>
          <p className='font-mono text-xs hidden lg:block'>synced from LinkedIn · Indeed · JobStreet · company sites</p>
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

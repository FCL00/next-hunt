'use client';
import { Button } from '@/components/ui/button';
import { ApplicationForm as EditForm } from './application-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type Application, ApplicationStage } from '@/validators/application';
import { ApplicationDropdownMenu } from './application-dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui/modal';
import { useState } from 'react';
import { useDeleteApplication } from '../hooks/use-application';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

type ApplicationColumnProps = {
  stage: ApplicationStage;
  applications: Application[];
};

export function ApplicationColumn({ stage, applications }: ApplicationColumnProps) {
  const stageApplication = applications.filter((application) => application.state === stage);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [deletingApplication, setDeletingApplication] = useState<Application | null>(null);
  const deleteApplication = useDeleteApplication();

  const handleDelete = () => {
    if (!deletingApplication) return;
    deleteApplication.mutate(deletingApplication.id, {
      onSuccess: () => setDeletingApplication(null),
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <p className="font-mono text-xs text-dark-400">{stage}</p>
          <Badge className="bg-dark-800 rounded-full px-2">{stageApplication.length}</Badge>
        </div>
        <ScrollArea className="max-h-150">
          {stageApplication.map((application) => (
            <Card className="relative mb-4" key={application.id}>
              <CardHeader>
                <CardTitle>{application.company}</CardTitle>
                <CardDescription>{application.role}</CardDescription>
                <span className="text-xs font-mono text-ink-muted">{application.salary}</span>
                <div className="absolute top-1 right-2">
                  <ApplicationDropdownMenu
                    currentStage={application.state}
                    applicationId={application.id}
                    onEdit={() => setEditingApplication(application)}
                    onDelete={() => setDeletingApplication(application)}
                  />
                </div>
              </CardHeader>
            </Card>
          ))}
        </ScrollArea>
      </div>
      <Modal open={!!editingApplication} onOpenChange={(open) => !open && setEditingApplication(null)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Update Application</ModalTitle>
            <ModalDescription>update the current application</ModalDescription>
          </ModalHeader>
          {editingApplication && (
            <EditForm
              application={editingApplication}
              onCancel={() => setEditingApplication(null)}
              onSuccess={() => setEditingApplication(null)}
            />
          )}
        </ModalContent>
      </Modal>

      <AlertDialog open={!!deletingApplication} onOpenChange={(open) => !open && setDeletingApplication(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="text-ink-100">{deletingApplication?.company}</span>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

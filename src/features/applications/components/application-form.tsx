'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Field } from '@/components/ui/forms';
import { TextArea } from '@/components/ui/textarea';
import { type ApplicationInput, ApplicationSchema } from '@/validators/application';
import { useCreateApplication, useUpdateApplication } from '@/features/applications/hooks/use-application';

import {
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/modal';

type ApplicationFormsProps = {
  applicationId?: string;
  defaultValues?: ApplicationInput;
};

export function ApplicationForm({ applicationId, defaultValues }: ApplicationFormsProps) {
  const isEditMode = Boolean(applicationId);
  const [open, setOpen] = useState(false);
  const createApplication = useCreateApplication();
  const updateApplication = useUpdateApplication();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(ApplicationSchema),
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, defaultValues, reset]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      reset(defaultValues);
    }
  };

  const onSubmit = async (application: ApplicationInput) => {
    if (isEditMode) {
      if (!applicationId) return;
      updateApplication.mutate({ applicationId: applicationId, application: application });
    } else {
      createApplication.mutate(application)
    }
    setOpen(false);
  };

  return (
    <>
      <Button size="sm" icon={<Plus />} iconPosition="left" onClick={() => setOpen(true)}>
        New Application
      </Button>
      <Modal open={open} onOpenChange={handleOpenChange}>
        <ModalContent>
          <ModalHeader>
            <ModalDescription className="text-xs">Track a new job application</ModalDescription>
            <ModalTitle>New Application</ModalTitle>
          </ModalHeader>
          <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
              <FormInput
                id="company"
                label="Company"
                placeholder="e.g. Google"
                registration={register('company')}
                error={errors.company}
                required
              />

              <FormInput
                id="role"
                label="Role"
                placeholder="e.g. Frontend Developer"
                registration={register('role')}
                error={errors.role}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
              <FormInput
                id="location"
                label="Location (optional)"
                placeholder="e.g. Manila, Philippines"
                registration={register('location')}
                error={errors.location}
              />

              <FormInput
                id="salary"
                label="Salary (optional)"
                placeholder="e.g. ₱50,000 - ₱70,000"
                registration={register('salary')}
                error={errors.salary}
              />
            </div>

            <FormInput
              id="job-url"
              label="Job URL (optional)"
              type="url"
              placeholder="https://example.com/job"
              registration={register('jobUrl')}
              error={errors.jobUrl}
            />

            <Field id="description" label="Description (optional)" error={errors.description}>
              <TextArea placeholder="Describe the position..." {...register('description')} />
            </Field>

            <Field id="notes" label="Notes (optional)" error={errors.notes}>
              <TextArea {...register('notes')} placeholder="Add any notes about this application..." />
            </Field>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </ModalClose>
              <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                Save Application
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

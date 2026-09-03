'use client';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Field } from '@/components/ui/forms';
import { TextArea } from '@/components/ui/textarea';
import { type Application, type ApplicationInput, ApplicationSchema } from '@/types/validators/application';
import { useUpdateApplication, useCreateApplication } from '../hooks/use-application';

type ApplicationFormsProps = {
  application?: Application;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function ApplicationForm({ application, onCancel, onSuccess }: ApplicationFormsProps) {
  const updateApplication = useUpdateApplication();
  const createApplication = useCreateApplication();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: application
      ? {
          company: application.company,
          role: application.role,
          location: application.location ?? '',
          salary: application.salary ?? '',
          jobUrl: application.jobUrl ?? '',
          description: application.description ?? '',
          notes: application.notes ?? '',
        }
      : undefined,
  });

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  const onSubmit = async (data: ApplicationInput) => {
    if (application) {
      updateApplication.mutate({ applicationId: application.id, application: data });
    } else {
      createApplication.mutate(data);
    }
    reset();
    onSuccess?.();
  };

  return (
    <>
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
        <div className="flex justify-end items-center gap-2">
          <Button variant="outline" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            {application ? 'Update Application' : 'Save Application'}
          </Button>
        </div>
      </form>
    </>
  );
}

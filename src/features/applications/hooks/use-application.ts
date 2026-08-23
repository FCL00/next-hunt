'use client';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  updateApplicationStage,
} from '../actions/job-applications';
import { ApplicationStage, type ApplicationInput } from '@/validators/application';
import { toast } from 'sonner';

export const applicationQueryKey = ['applications'] as const;

export function useApplications() {
  return useQuery({
    queryKey: applicationQueryKey,
    queryFn: getApplications,
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: applicationQueryKey,
      });
      toast.success('Successfully added');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

type ApplicationProps = { applicationId: string; application: ApplicationInput };

export function useUpdateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, application }: ApplicationProps) => updateApplication(applicationId, application),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: applicationQueryKey,
      });
      toast.success('Successfully updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId }: { applicationId: string }) => deleteApplication(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: applicationQueryKey,
      });
      toast.success('Successfully delete');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateApplicationStage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, state }: { applicationId: string; state: ApplicationStage }) =>
      updateApplicationStage(applicationId, state),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: applicationQueryKey,
      });
      toast.success('State updated');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}

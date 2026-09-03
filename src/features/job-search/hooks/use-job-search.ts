import { useInfiniteQuery } from '@tanstack/react-query';
import { searchJobs } from '../api/job-search-api';
import { JobSearchParams } from '@/types';

export const jobQueryKey = ['jobs'] as const;

export function useJobSearch(params: Omit<JobSearchParams, 'cursor'>) {
  return useInfiniteQuery({
    queryKey: [...jobQueryKey, params],
    queryFn: ({ pageParam }) =>
      searchJobs({
        ...params,
        ...(pageParam && { cursor: pageParam }),
      }),

    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.data.cursor ?? undefined,
    enabled: params.query.trim().length > 0,
  });
}

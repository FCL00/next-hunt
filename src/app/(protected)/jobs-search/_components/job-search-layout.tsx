'use client';
import { JobSearchForm as SearchForm } from '@/features/job-search/components/job-search-form';
import { JobDescriptionSection } from '@/features/job-search/components/job-description-section';
import { JobCard } from '@/features/job-search/components/job-card';
import { useJobSearch } from '@/features/job-search/hooks/use-job-search';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import data from '@/testing/__mocks__/data/job-search.json';
import { JobSearchParams } from '@/types';

export function JobSearchLayout() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [search, setSearch] = useState<JobSearchParams>({
    query: 'Software Engineer',
    country: 'ph',
    language: 'en',
    num_pages: 1,
  });
  // const jobs = data.data.jobs;
  // const isLoading = false;
  // const isError = false;
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobSearch(search);
  const jobs = data?.pages.flatMap((page) => page.data.jobs) ?? [];
  const selectedJob = jobs.find((job) => job.job_id === selectedJobId);
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-start items-center">
        <SearchForm onSearch={setSearch} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="left border-y border-r border-dark-500 p-4">
          {jobs.length === 0 ? (
            <div>Search for work</div>
          ) : (
            <ScrollArea className="h-[calc(100vh-200px)]">
              {jobs.map((job) => (
                <JobCard
                  key={job.job_id}
                  job={job}
                  onClick={() => setSelectedJobId(job.job_id)}
                  isActive={job.job_id === selectedJobId}
                />
              ))}
              {/* <Button className="w-full" variant="outline">
                Load More
              </Button> */}
              {hasNextPage && (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </Button>
              )}
            </ScrollArea>
          )}
        </div>
        <div className="hidden border-y border-dark-500 p-6 lg:block">
          <JobDescriptionSection job={selectedJob} />
        </div>
      </div>
    </div>
  );
}

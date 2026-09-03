import { Job } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { JobButtonActions } from './job-button-actions';
import { Badge } from '@/components/ui/badge';
import { JobDescription } from './job-description';

type JobDescriptionSectionProps = {
  job?: Job;
};

export function JobDescriptionSection({ job }: JobDescriptionSectionProps) {
  return (
    <>
      {job ? (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-3xl font-fraunces">{job.job_title}</h3>
            <p className="text-xs font-mono">
              {job.employer_name} ~ {job.job_country}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {job.job_employment_types.map((value, index) => (
                <Badge className="max-w-fit p-1 " key={index}>
                  {value}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              {job.job_posted_at && (
                <p className="text-xs font-mono">
                  Posted {job.job_posted_at} ·{' '}
                </p>
              )}
              <span className="text-xs font-mono text-signal">
                {job.apply_options.map((option) => `${option.publisher} `)}
              </span>
            </div>
            <JobButtonActions applyLink={job.job_apply_link}/>
            <div className="py-4">
              <h2 className="mb-4 text-lg text-ink font-semibold font-mono">
                Job description
              </h2>
              <JobDescription content={job.job_description} />
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-lg text-ink-muted">
            Select a job to view its details
          </p>
        </div>
      )}
    </>
  );
}

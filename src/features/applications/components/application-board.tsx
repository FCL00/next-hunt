'use client';
import { useApplications } from '../hooks/use-application';
import { ApplicationColumn } from './application-column';

export function ApplicationBoard() {
  const { data: applications = [], isPending, isError, error } = useApplications();
  
  if (isPending) {
    // TODO: REPLACE WITH SKELETON
    return <div>Loading applications...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="mt-8 flex min-h-64 items-center justify-center rounded-lg border">
        <p className="text-sm text-ink-muted">No applications yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ApplicationColumn stage="APPLIED" applications={applications} />
      <ApplicationColumn stage="SCREENING" applications={applications} />
      <ApplicationColumn stage="INTERVIEW" applications={applications} />
      <ApplicationColumn stage="OFFER" applications={applications} />
    </div>
  );
}

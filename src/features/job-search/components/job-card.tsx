import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import { Job } from '@/types';
import { Link } from '@/components/ui/link';
import { Link as LinkIcon, Building2 } from 'lucide-react';

type JobCardProps = {
  job: Job;
  onClick: () => void;
  isActive?: boolean;
};

export function JobCard({ job, onClick, isActive = false }: JobCardProps) {
  return (
    <Card onClick={onClick} className="w-full mb-4 hover:cursor-pointer" tone={ isActive ? 'active' : 'default'}>
      <CardHeader className="w-full flex gap-4 items-center relative">
        <Building2 className="text-ink-muted" />
        <div className="flex flex-col">
          <CardTitle>{job.job_title}</CardTitle>
          <CardDescription className="font-inter">{job.job_location}</CardDescription>
          {job.job_salary && <CardDescription className="text-signal text-xs font-mono">$214.5K-$300K</CardDescription>}
        </div>
        <Link className="block lg:hidden absolute top-0 right-0 " href={job.job_apply_link}>
          <LinkIcon className="h-4 lg:h-8" />
        </Link>
      </CardHeader>
      <CardContent>
        <CardDescription className="hidden md:block max-w-full text-ellipsis">{`${job.job_description.slice(0, 300)}...`}</CardDescription>
      </CardContent>
    </Card>
  );
}

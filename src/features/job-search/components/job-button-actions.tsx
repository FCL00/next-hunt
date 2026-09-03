'use client';
import { Button } from '@/components/ui/button';
import { Plus, Sparkle, ArrowUpRight } from 'lucide-react';
import { Link } from '@/components/ui/link';

type JobButtonActionsProps = {
  applyLink: string
}

export function JobButtonActions({ applyLink }: JobButtonActionsProps) {
  return (
    <div className="w-full flex flex-wrap items-center gap-2 border-b border-dark-500 py-4">
      <Button asChild>
        <Link href={applyLink} target="_blank" rel="noopener noreferrer">
          Apply <ArrowUpRight />
        </Link>
      </Button>
      <Button icon={<Plus />} variant="outline">
        Track Application
      </Button>
      <Button icon={<Sparkle />} variant="outline">
        Build resume for this role
      </Button>
    </div>
  );
}

import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ContentLayoutProps = {
  className?: string;
  children: ReactNode;
  title?: string;
};

export const ContentLayout = ({ className, children, title = '' }: ContentLayoutProps) => {
  return <div className={cn("max-w-6xl mx-auto px-6 pt-20 pb-16 relative", className)}>{children}</div>;
};

import { ReactNode } from 'react';

type ContentLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const ContentLayout = ({ children, title = '' }: ContentLayoutProps) => {
  return <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 relative">{children}</div>;
};

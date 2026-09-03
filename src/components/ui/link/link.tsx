import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { cn } from '@/utils/cn';

export type LinkProps = {
  className?: string;
  children: React.ReactNode;
} & NextLinkProps & Omit<React.ComponentPropsWithRef<'a'>, keyof NextLinkProps>;

export const Link = ({ className, children, href, ...props }: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={cn('text-ink-muted hover:text-ink text-sm', className)}
      {...props}
    >
      {children}
    </NextLink>
  );
};

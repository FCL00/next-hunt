import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const linkVariants = cva(
  'inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink',
        muted: 'text-ink-muted hover:text-ink',
        nav: 'text-ink-muted hover:text-ink',
        ghost: 'border-b border-hairline pb-1 text-ink-muted hover:border-ink-muted hover:text-ink',
        signal: 'text-signal hover:text-signal/80',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        xxl: 'text-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'xs',
    },
  },
);

export type LinkProps = {
  className?: string;
  children: React.ReactNode;
  target?: string;
} & NextLinkProps &
  VariantProps<typeof linkVariants>;

export function Link({ className, children, variant, size, href, ...props }: LinkProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        linkVariants({
          variant,
          size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}

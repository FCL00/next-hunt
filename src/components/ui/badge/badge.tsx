import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded px-1.5 py-0.5 border font-mono text-[10px] leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border-hairline text-ink-muted',
        signal: 'border-signal/30 text-signal',
        stale: 'border-hairline text-stale',
      },
      size: {
        default: 'text-[10px] px-1.5 py-0.5',
        sm: 'text-[9px] px-1 py-0.5',
        lg: 'text-[11px] px-2 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({
            variant,
            size,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
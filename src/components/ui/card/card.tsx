import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const cardVariants = cva('flex flex-col gap-2 rounded-xl border p-4 text-ink', {
  variants: {
    tone: {
      default: 'border-dark-500 bg-dark-800',
      active:
        'border-signal/40 bg-dark-700 shadow-[0_0_0_1px_rgb(74_222_148_/_0.08)]',
      subdued: 'border-hairline bg-dark-700 opacity-70',
      success: 'border-signal/40 bg-signal/10',
      stale:
        'border-hairline bg-surface shadow-[inset_2px_0_0_0_theme(colors.amber.500/0.5)]',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

interface CardProps
  extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {}

function Card({ className, tone, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ tone, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('grid auto-rows-min items-start gap-1', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <div
      data-slot="CardTitle"
      className={cn('text-sm font-medium text-ink', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-ink-muted', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  cardVariants,
};

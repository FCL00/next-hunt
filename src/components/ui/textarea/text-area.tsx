import * as React from 'react';
import { cn } from '@/utils/cn';

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full min-h-16 resize-y',
          'bg-dark-900 px-3.5 py-2.5',
          'border border-dark-500 rounded-sm',
          'font-inter text-sm text-ink-50',
          'outline-none',
          'placeholder:text-ink-muted',
          'focus:border-ink-100',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export { TextArea };
import * as React from 'react';
import { cn } from '@/utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      autoComplete="off"
      className={cn(
        'w-full bg-dark-800 text-[14px] p-[12px_14px]',
        'border border-dark-500 rounded-sm font-inter',
        'focus:border-ink-100 text-ink-50 outline-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };

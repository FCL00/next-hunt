import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md font-inter font-medium transition-all duration-150 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal',
  {
    variants: {
      variant: {
        primary: 'bg-signal text-void hover:brightness-110 hover:text-void active:brightness-100',
        secondary: 'border border-hairline bg-white text-void hover:bg-white/90',
        outline: 'border border-hairline bg-transparent text-ink hover:bg-surface-100 hover:border-signal/40',
        ghost: 'text-ink-muted',
        link: 'h-auto p-0 text-signal underline-offset-4 hover:underline',
        signal: 'border border-signal/30 bg-signal/10 text-signal hover:bg-signal/15',
        destructive: 'border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/15',
      },
      size: {
        sm: 'h-8 rounded px-3.5 text-xs',
        md: 'h-10 px-5 text-[13.5px]',
        lg: 'h-12 px-7 text-sm',
      },
      disabled: {
        false: null,
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        disabled: true,
        class: 'bg-signal/50 hover:brightness-100 text-void',
      },
      {
        variant: 'secondary',
        disabled: true,
        class: 'bg-surface/50 hover:bg-surface/50 text-ink-muted',
      },
      {
        variant: 'outline',
        disabled: true,
        class: 'border-hairline/50 hover:bg-transparent text-ink-muted',
      },
      {
        variant: 'ghost',
        disabled: true,
        class: 'hover:bg-transparent text-ink-muted',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
  };

export type ButtonVariants = NonNullable<ButtonVariantProps['variant']>;
export type ButtonSize = NonNullable<ButtonVariantProps['size']>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, isLoading, disabled, icon, iconPosition = 'left', ...props }, ref) => {
    const isDisabled = disabled || isLoading;
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={cn(buttonVariants({ variant, size, disabled: !!isDisabled }), className)}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {asChild ? (
          children
        ) : isLoading ? (
          'Loading...'
        ) : (
          <>
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span>{icon}</span>}
          </>
        )}
      </Component>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };

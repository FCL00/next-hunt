import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import * as React from 'react';

const LabelVariants = cva('text-ink-50', {
  variants: {
    size: {
      xs: 'text-[12.5px]',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      xxl: 'text-2xl',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'xs',
  },
});

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof LabelVariants>
>(({ className, size, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(LabelVariants({ size }), className)} {...props} />
));

Label.displayName = LabelPrimitive.Root.displayName;
export { Label };

import { cva, type VariantProps } from 'class-variance-authority';

const dotVariants = cva('size-2 rounded-full w-1.5 h-1.5', {
  variants: {
    variant: {
      default: 'bg-current',
      success: 'bg-green-400',
      warning: 'bg-yellow-400',
      danger: 'bg-red-400',
    },
    pulse: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'success',
    pulse: false,
  },
});

type DotProps = VariantProps<typeof dotVariants> & {
  className?: string;
};

export function Dot({ pulse, className }: DotProps) {
  return <span className={dotVariants({ pulse, className })} />;
}

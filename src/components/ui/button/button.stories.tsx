import { Button, type ButtonVariants, type ButtonSize } from './button';
import { type Meta, type StoryObj } from '@storybook/nextjs-vite';
import { Waypoints } from 'lucide-react';

const sizeOptions: ButtonSize[] = ['default', 'sm', 'lg'];
const variantsOptions: ButtonVariants[] = ['primary', 'secondary', 'outline', 'ghost', 'link', 'signal', 'destructive'];

const meta = {
  title: 'Design System/ui/Button',
  component: Button,
  args: {
    size: 'sm',
    children: 'Click Me',
    asChild: false,
    isLoading: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variantsOptions,
    },
    size: {
      control: { type: 'select' },
      options: sizeOptions,
    },
    asChild: {
      control: { type: 'boolean' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default = {
  args: {
    variant: 'primary',
    size: 'default',
  },
} satisfies Story;

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
  },
} satisfies Story;

export const Outline = {
  args: {
    variant: 'outline',
  },
} satisfies Story;

export const Ghost = {
  args: {
    variant: 'ghost',
  },
} satisfies Story;

export const Link = {
  args: {
    variant: 'link',
  },
} satisfies Story;

export const Signal = {
  args: {
    variant: 'signal',
  },
} satisfies Story;

export const Destructive = {
  args: {
    variant: 'destructive',
  },
} satisfies Story;

export const WithIcon = {
  args: {
    icon: <Waypoints />,
  },
} satisfies Story;

export const IconOnly = {
  args: {
    children: null,
    icon: <Waypoints />,
    size: 'default',
  },
} satisfies Story;

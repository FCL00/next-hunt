'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

const Modal = Dialog.Root;

const ModalTrigger = Dialog.Trigger;

const ModalClose = Dialog.Close;

const ModalPortal = Dialog.Portal;

const ModalOverlay = React.forwardRef<
  React.ComponentRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <Dialog.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50',
        'bg-black/60 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  );
});

ModalOverlay.displayName = Dialog.Overlay.displayName;

const ModalContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <ModalPortal>
      <ModalOverlay />

      <Dialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50',
          'w-[calc(100%-2rem)] max-w-lg',
          '-translate-x-1/2 -translate-y-1/2',
          'rounded-lg border border-dark-500',
          'bg-dark-800 text-ink-50 shadow-xl',
          'focus:outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className,
        )}
        {...props}
      >
        {children}

        <Dialog.Close
          className={cn(
            'absolute right-4 top-4',
            'inline-flex h-7 w-7 items-center justify-center',
            'rounded-sm text-ink-muted',
            'transition-colors',
            'hover:bg-dark-700 hover:text-ink-50',
            'focus-visible:outline-none',
            'focus-visible:ring-1 focus-visible:ring-signal',
          )}
        >
          <X className="h-4 w-4 cursor-pointer" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </ModalPortal>
  );
});

ModalContent.displayName = Dialog.Content.displayName;

const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col text-left border-b border-dark-500 p-4 ', className)} {...props} />;
};

ModalHeader.displayName = 'ModalHeader';

const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />;
};

ModalFooter.displayName = 'ModalFooter';

const ModalTitle = React.forwardRef<React.ComponentRef<typeof Dialog.Title>, React.ComponentPropsWithoutRef<typeof Dialog.Title>>(
  ({ className, ...props }, ref) => {
    return <Dialog.Title ref={ref} className={cn('text-base font-semibold font-inter text-ink-50', className)} {...props} />;
  },
);

ModalTitle.displayName = Dialog.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => {
  return <Dialog.Description className={cn('text-sm font-inter text-ink-muted', className)} {...props} ref={ref} />;
});

ModalDescription.displayName = Dialog.Description.displayName;

const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
  }
>(({ className, asChild, children, ...props }, ref) => {
  const Component = asChild ? Slot : 'div';

  return (
    <Component ref={ref} className={cn('py-6', className)} {...props}>
      {children}
    </Component>
  );
});

export { Modal, ModalTrigger, ModalClose, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalBody };

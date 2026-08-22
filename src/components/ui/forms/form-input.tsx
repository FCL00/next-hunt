import * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { Field, FieldWrapperPassThroughProps } from './field';
import { cn } from '@/utils/cn';

export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, label, id, error, registration, required, ...props }, ref) => {
    return (
      <Field id={id} label={label} error={error} required={required}>
        <input
          type={type}
          autoComplete='off'
          className={cn(
            'w-full bg-dark-900 text-[14px] p-[12px_14px] border border-dark-500 rounded-sm font-inter focus:border-ink-100 text-ink-50 outline-none',
          )}
          ref={ref}
          {...registration}
          {...props}
        />
      </Field>
    );
  },
);

FormInput.displayName = 'FormInput';

export { FormInput };

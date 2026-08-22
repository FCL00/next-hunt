import * as React from 'react';
import { type FieldError } from 'react-hook-form';

import { Error } from './errors';
import { Label } from './label';

type FieldWrapperProps = {
  id?: string;
  label?: string;
  className?: string;
  required?: boolean;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const Field = (props: FieldWrapperProps) => {
  const { label, error, children, id, required } = props;

  return (
    <div className="relative flex flex-col mb-5">
      {label && (
        <Label htmlFor={id}>
          {label}

          {required && (
            <span aria-hidden="true" className="ml-1 text-signal">
              *
            </span>
          )}
        </Label>
      )}

      <div>{children}</div>

      <Error errorMessage={error?.message} />
    </div>
  );
};

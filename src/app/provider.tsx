'use client';
import * as React from 'react';
import { Toaster } from 'sonner';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}

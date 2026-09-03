'use client';
import * as React from 'react';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MSWProvider } from '@/testing/__mocks__/provider';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <MSWProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="top-right" richColors />
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </MSWProvider>
    </>
  );
}

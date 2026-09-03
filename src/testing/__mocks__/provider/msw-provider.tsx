'use client';
import { ReactNode, useState, useEffect } from 'react';
import { env } from '@/lib/env/client';

type MSWProviderProps = {
  children: ReactNode;
};

export function MSWProvider({ children }: MSWProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function enableMocking() {
      if (process.env.NODE_ENV !== 'development' || env.NEXT_PUBLIC_ENABLE_API_MOCKING !== true) {
        setReady(true);
        return;
      }
      const { worker } = await import('../browser');
      if (cancelled) {
        return;
      }
      await worker.start({
        onUnhandledRequest: 'warn',
      });
      if (!cancelled) {
        setReady(true);
      }
    }
    enableMocking();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return null;
  }

  return children;
}

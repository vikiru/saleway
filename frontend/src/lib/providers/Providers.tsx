'use client';

import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from './ReactQueryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <Toaster position="top-right" richColors />
    </ReactQueryProvider>
  );
}

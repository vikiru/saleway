'use client';

import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from '@/lib/providers/ReactQueryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <Toaster position="top-right" richColors />
    </ReactQueryProvider>
  );
}

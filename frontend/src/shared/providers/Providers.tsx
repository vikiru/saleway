'use client';

import { ThemeProvider } from 'next-themes';

import { ReactQueryProvider } from '@/shared/providers/ReactQueryProvider';
import { Toaster } from '@/shared/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactQueryProvider>
        {children}
        <Toaster position="top-right" richColors />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

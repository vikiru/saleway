import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/lib/components/ui/sonner';
import { ReactQueryProvider } from '@/lib/providers/ReactQueryProvider';

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

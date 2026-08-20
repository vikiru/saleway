import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import { Footer } from '@/lib/components/layout/Footer';
import { Navbar } from '@/lib/components/layout/Navbar';
import { ClerkProvider } from '@/lib/providers/ClerkProvider';
import { Providers } from '@/lib/providers/Providers';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Saleway | Modern Ecommerce',
  description: 'A premium ecommerce experience built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/10 selection:text-primary`}
      >
        <ClerkProvider>
          <Providers>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}

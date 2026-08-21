import type { ReactNode } from 'react';

import { ClerkProvider as BaseClerkProvider } from '@clerk/nextjs';
import { shadcn } from '@clerk/themes';

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    <BaseClerkProvider
      afterSignOutUrl="/"
      appearance={{
        baseTheme: shadcn,
      }}
      dynamic
    >
      {children}
    </BaseClerkProvider>
  );
}

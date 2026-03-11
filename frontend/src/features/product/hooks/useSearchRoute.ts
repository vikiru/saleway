'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useSearchRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useCallback(
    (term: string, options: { replace?: boolean; scroll?: boolean } = {}) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      if (term) {
        params.set('q', term);
      } else {
        params.delete('q');
      }
      params.set('page', '1');
      const url = `${pathname}?${params.toString()}`;

      if (options.replace) {
        router.replace(url, { scroll: options.scroll ?? false });
      } else {
        router.push(url, { scroll: options.scroll ?? true });
      }
    },
    [searchParams, pathname, router],
  );

  return { handleSearch };
}

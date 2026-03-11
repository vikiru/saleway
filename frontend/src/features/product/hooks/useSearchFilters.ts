'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';

interface UseSearchFiltersProps {
  initialMinPrice: string;
  initialMaxPrice: string;
}

export function useSearchFilters({ initialMinPrice, initialMaxPrice }: UseSearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams?.toString() ?? '');

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === '' || value === 'all') {
          newParams.delete(key);
        } else {
          newParams.set(key, value as string);
        }
      }

      return newParams.toString();
    },
    [searchParams],
  );

  const handleFilterChange = (key: string, value: string) => {
    startTransition(() => {
      router.push(`${pathname ?? ''}?${createQueryString({ [key]: value, page: '1' })}`);
    });
  };

  const handlePriceApply = () => {
    startTransition(() => {
      router.push(`${pathname ?? ''}?${createQueryString({ minPrice, maxPrice, page: '1' })}`);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      router.push(pathname ?? '');
    });
    setMinPrice('');
    setMaxPrice('');
  };

  return {
    isPending,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    handleFilterChange,
    handlePriceApply,
    handleReset,
  };
}

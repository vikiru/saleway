'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface UseProductFiltersProps {
  selectedCategories: string[];
  selectedBrands: string[];
  initialMinPrice: string;
  initialMaxPrice: string;
}

export function useProductFilters({
  selectedCategories,
  selectedBrands,
  initialMinPrice,
  initialMaxPrice,
}: UseProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  const createQueryString = useCallback(
    (params: Record<string, string | string[] | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === '') {
          newParams.delete(key);
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            newParams.delete(key);
          } else {
            newParams.set(key, value.join(','));
          }
        } else {
          newParams.set(key, value);
        }
      }

      return newParams.toString();
    },
    [searchParams],
  );

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    router.push(`${pathname}?${createQueryString({ category: newCategories, page: '1' })}`);
  };

  const handleBrandChange = (brandId: string) => {
    const newBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    router.push(`${pathname}?${createQueryString({ brand: newBrands, page: '1' })}`);
  };

  const handlePriceApply = () => {
    router.push(`${pathname}?${createQueryString({ minPrice, maxPrice, page: '1' })}`);
  };

  return {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    handleCategoryChange,
    handleBrandChange,
    handlePriceApply,
  };
}

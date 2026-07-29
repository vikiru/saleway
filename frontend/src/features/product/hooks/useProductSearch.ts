'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Product } from '@/features/product/types/product';

interface UseProductSearchProps {
  allProducts: Product[];
  initialParams: {
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
  };
  itemsPerPage: number;
}

export function useProductSearch({ allProducts, initialParams, itemsPerPage }: UseProductSearchProps) {
  const [query, setQuery] = useState(initialParams.q || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialParams.category ? initialParams.category.split(',') : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialParams.brand ? initialParams.brand.split(',') : [],
  );
  const [minPrice, setMinPrice] = useState(initialParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialParams.maxPrice || '');
  const [sortBy, setSortBy] = useState(initialParams.sortBy || 'price-asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }

    if (selectedCategories.length > 0) {
      const lowerCategories = selectedCategories.map((c) => c.toLowerCase());
      result = result.filter((p) => lowerCategories.includes(p.category.toLowerCase()));
    }

    if (selectedBrands.length > 0) {
      const lowerBrands = selectedBrands.map((b) => b.toLowerCase());
      result = result.filter((p) => lowerBrands.includes(p.brand.toLowerCase()));
    }

    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;

    if (min !== undefined) result = result.filter((p) => p.price >= min);
    if (max !== undefined) result = result.filter((p) => p.price <= max);

    return result.sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return a.price - b.price;
      }
    });
  }, [allProducts, query, selectedCategories, selectedBrands, minPrice, maxPrice, sortBy]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFilterChange = useCallback((key: string, value: string) => {
    if (key === 'category') {
      setSelectedCategories(value === 'all' ? [] : [value]);
    } else if (key === 'brand') {
      setSelectedBrands(value === 'all' ? [] : [value]);
    }
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('price-asc');
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((val: string) => {
    setQuery(val);
    setCurrentPage(1);
  }, []);

  const handlePriceApply = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((val: string) => {
    setSortBy(val);
    setCurrentPage(1);
  }, []);

  return {
    query,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    sortBy,
    currentPage,
    pageProducts,
    totalProducts,
    totalPages,
    setMinPrice: (val: string) => {
      setMinPrice(val);
      setCurrentPage(1);
    },
    setMaxPrice: (val: string) => {
      setMaxPrice(val);
      setCurrentPage(1);
    },
    handlePageChange,
    handleFilterChange,
    handleReset,
    handleSearch,
    handlePriceApply,
    handleSort,
  };
}

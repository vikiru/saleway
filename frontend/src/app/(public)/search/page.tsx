export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';

import { getProducts } from '@/entities/product/api/product';
import { deriveFilterOptions } from '@/features/search/utils/filters';
import { SearchPage } from '@/views/search/SearchPage';

export const metadata: Metadata = {
  title: 'Search Products - Saleway',
  description: 'Search and filter our wide selection of products.',
};
interface ProductSearchProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  }>;
}

export default async function Search({ searchParams }: ProductSearchProps) {
  const [params, allProducts] = await Promise.all([searchParams, getProducts()]);
  const { categories, brands } = deriveFilterOptions(allProducts);

  return <SearchPage allProducts={allProducts} brands={brands} categories={categories} searchParams={params} />;
}

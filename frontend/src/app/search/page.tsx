import { getProducts } from '@/features/product/api/product';
import { deriveFilterOptions } from '@/features/product/utils/filters';
import { SearchPage } from '@/pages/search/SearchPage';

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

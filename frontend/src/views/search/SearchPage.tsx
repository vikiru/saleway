import type { Product } from '@/entities/product/types/product';
import type { FilterItem } from '@/features/search/utils/filters';

import { SearchInteractiveZone } from './components/SearchInteractiveZone';

interface SearchPageProps {
  allProducts: Product[];
  categories: FilterItem[];
  brands: FilterItem[];
  searchParams: {
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  };
}

export function SearchPage({ allProducts, categories, brands, searchParams }: SearchPageProps) {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-none px-4 py-8 sm:px-6 lg:px-12">
        <SearchInteractiveZone
          allProducts={allProducts}
          brands={brands}
          categories={categories}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}

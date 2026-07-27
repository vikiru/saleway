'use client';

import { FilterSection } from '@/features/product/components/FilterSection';
import { useProductSearch } from '@/features/product/hooks/useProductSearch';
import type { Product } from '@/features/product/types/product';
import type { FilterItem } from '@/features/product/utils/filters';
import { SearchHeader } from './components/SearchHeader';
import { SearchResultsGrid } from './components/SearchResultsGrid';

const ITEMS_PER_PAGE = 25;

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
  const {
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
    setMinPrice,
    setMaxPrice,
    handlePageChange,
    handleFilterChange,
    handleReset,
    handleSearch,
    handlePriceApply,
    handleSort,
  } = useProductSearch({
    allProducts,
    initialParams: searchParams,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const filterContent = (
    <FilterSection
      brands={brands}
      categories={categories}
      maxPrice={maxPrice}
      minPrice={minPrice}
      onFilterChange={handleFilterChange}
      onPriceApply={handlePriceApply}
      onReset={handleReset}
      selectedBrands={selectedBrands}
      selectedCategories={selectedCategories}
      setMaxPrice={setMaxPrice}
      setMinPrice={setMinPrice}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-none px-4 py-8 sm:px-6 lg:px-12">
        <SearchHeader
          filterContent={filterContent}
          onSearch={handleSearch}
          onSort={handleSort}
          searchTerm={query}
          sortBy={sortBy}
        />

        <div className="pt-6 pb-24 lg:grid lg:grid-cols-4 lg:gap-x-8">
          <aside className="hidden lg:block">{filterContent}</aside>

          <div className="lg:col-span-3">
            <SearchResultsGrid
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              products={pageProducts}
              totalPages={totalPages}
              totalProducts={totalProducts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

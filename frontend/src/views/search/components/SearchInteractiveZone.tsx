'use client';

import type { Product } from '@/entities/product/types/product';
import type { FilterItem } from '@/features/search/utils/filters';

import { FilterSection } from '@/features/search/components/FilterSection';
import { useProductSearch } from '@/features/search/hooks/useProductSearch';

import { SearchHeader } from './SearchHeader';
import { SearchResultsGrid } from './SearchResultsGrid';

const ITEMS_PER_PAGE = 25;

interface SearchInteractiveZoneProps {
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

export function SearchInteractiveZone({ allProducts, categories, brands, searchParams }: SearchInteractiveZoneProps) {
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
    <>
      <SearchHeader
        filterContent={filterContent}
        onSearch={handleSearch}
        onSort={handleSort}
        searchTerm={query}
        sortBy={sortBy}
      />

      <div className="pt-6 pb-24 lg:grid lg:grid-cols-5 lg:gap-x-8">
        <aside className="hidden lg:col-span-1 lg:block">{filterContent}</aside>

        <div className="mt-6 lg:col-span-4 lg:mt-0">
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
    </>
  );
}

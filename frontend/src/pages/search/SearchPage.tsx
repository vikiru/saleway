'use client';

import { useMemo } from 'react';
import { FilterSection } from '@/features/product/components/FilterSection';
import type { Product } from '@/features/product/types/product';
import type { FilterItem } from '@/features/product/utils/filters';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/lib/components/ui/pagination';
import { SEARCH_ROUTE } from '@/lib/constants/routes';
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
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const filtered = useMemo(() => {
    const q = searchParams.q?.toLowerCase() ?? '';
    const category = searchParams.category;
    const brand = searchParams.brand;
    const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
    const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
    const sortBy = searchParams.sortBy ?? 'price-asc';

    let result = allProducts;

    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }
    if (category) {
      result = result.filter((p) => category.split(',').includes(p.category));
    }
    if (brand) {
      const brands = brand.split(',');
      result = result.filter((p) => brands.includes(p.brand.toLowerCase()));
    }
    if (minPrice !== undefined) {
      result = result.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    return [...result].sort((a, b) => {
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
  }, [allProducts, searchParams]);

  const totalProducts = filtered.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalProducts);
  const pageProducts = filtered.slice(startIndex, endIndex);

  const selectedCategories = searchParams.category ? searchParams.category.split(',') : [];
  const selectedBrands = searchParams.brand ? searchParams.brand.split(',') : [];

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (searchParams.q) params.set('q', searchParams.q);
    if (searchParams.category) params.set('category', searchParams.category);
    if (searchParams.brand) params.set('brand', searchParams.brand);
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);
    if (searchParams.sortBy) params.set('sortBy', searchParams.sortBy);
    params.set('page', String(page));
    return `${SEARCH_ROUTE}?${params.toString()}`;
  };

  const filterContent = (
    <FilterSection
      brands={brands}
      categories={categories}
      maxPrice={searchParams.maxPrice || ''}
      minPrice={searchParams.minPrice || ''}
      selectedBrands={selectedBrands}
      selectedCategories={selectedCategories}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-none px-4 py-8 sm:px-6 lg:px-12">
        <SearchHeader filterContent={filterContent} searchTerm={searchParams.q} sortBy={searchParams.sortBy} />

        <div className="pt-6 pb-24 lg:grid lg:grid-cols-4 lg:gap-x-8">
          <aside className="hidden lg:block">{filterContent}</aside>

          <div className="lg:col-span-3">
            <SearchResultsGrid
              endIndex={endIndex}
              products={pageProducts}
              startIndex={startIndex}
              totalProducts={totalProducts}
            />

            {totalProducts > ITEMS_PER_PAGE && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'} />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1;
                      const isCurrent = currentPage === page;

                      if (
                        totalPages > 5 &&
                        (page < currentPage - 1 || page > currentPage + 1) &&
                        page !== 1 &&
                        page !== totalPages
                      ) {
                        return page === currentPage - 2 || page === currentPage + 2 ? (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : null;
                      }

                      return (
                        <PaginationItem key={page}>
                          <PaginationLink href={createPageUrl(page)} isActive={isCurrent}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

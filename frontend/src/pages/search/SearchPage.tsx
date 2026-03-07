import { getProducts } from '@/features/product/api/product';
import { FilterSection } from '@/features/product/components/FilterSection';
import type { ProductWithRating } from '@/features/product/types/product';
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

const ITEMS_PER_PAGE = 9;

interface SearchPageProps {
  products: ProductWithRating[];
  totalProducts: number;
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

export function SearchPage({ products, totalProducts, searchParams }: SearchPageProps) {
  const allProducts = getProducts();

  const categories = Array.from(new Set(allProducts.map((p) => p.category)))
    .sort()
    .map((cat) => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }));

  const brands = Array.from(new Set(allProducts.map((p) => p.brand)))
    .sort()
    .map((brand) => ({ id: brand.toLowerCase(), label: brand }));

  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + products.length, totalProducts);

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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchHeader filterContent={filterContent} searchTerm={searchParams.q} sortBy={searchParams.sortBy} />

        <div className="pt-6 pb-24 lg:grid lg:grid-cols-4 lg:gap-x-8">
          <aside className="hidden lg:block">{filterContent}</aside>

          <div className="lg:col-span-3">
            <SearchResultsGrid
              endIndex={endIndex}
              products={products}
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

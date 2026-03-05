import { Filter, Search } from 'lucide-react';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/lib/components/ui/empty';
import { Button } from '@/lib/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/lib/components/ui/pagination';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { FilterSection } from '@/features/product/components/FilterSection';
import { ProductGrid } from '@/features/product/components/ProductGrid';
import { SearchInput } from '@/features/product/components/SearchInput';
import { SortSelect } from '@/features/product/components/SortSelect';
import type { ProductWithRating } from '@/features/product/types/product';
import { getProducts } from '@/features/product/api/product';
import { SEARCH_ROUTE } from '@/lib/constants/routes';
import Link from 'next/link';

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
  const allProductsResponse = getProducts();
  const allProducts = allProductsResponse.data || [];

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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6 pt-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Shop All</h1>
          </div>

          <div className="flex items-center space-x-4 flex-1 justify-end">
            <SearchInput defaultValue={searchParams.q} />
            <SortSelect defaultValue={searchParams.sortBy} />

            <div className="lg:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filters</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="h-full max-h-screen overflow-y-auto sm:max-w-xs">
                  <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <FilterSection
                      brands={brands}
                      categories={categories}
                      maxPrice={searchParams.maxPrice || ''}
                      minPrice={searchParams.minPrice || ''}
                      selectedBrands={selectedBrands}
                      selectedCategories={selectedCategories}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-24 lg:grid lg:grid-cols-4 lg:gap-x-8">
          <aside className="hidden lg:block">
            <FilterSection
              brands={brands}
              categories={categories}
              maxPrice={searchParams.maxPrice || ''}
              minPrice={searchParams.minPrice || ''}
              selectedBrands={selectedBrands}
              selectedCategories={selectedCategories}
            />
          </aside>

          <div className="mt-6 lg:mt-0 lg:col-span-3">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {totalProducts > 0 ? startIndex + 1 : 0}-{endIndex} of {totalProducts} items
            </p>

            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <ProductGrid products={products} />

              {totalProducts === 0 && (
                <Empty className="py-12 border-none">
                  <EmptyHeader>
                    <div className="bg-muted flex size-12 items-center justify-center rounded-full mb-4">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <EmptyTitle>No products found</EmptyTitle>
                    <EmptyDescription>We couldn't find any products matching your current filters.</EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Link href={SEARCH_ROUTE}>
                      <Button variant="outline">Clear all filters</Button>
                    </Link>
                  </EmptyContent>
                </Empty>
              )}
            </ScrollArea>

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
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
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

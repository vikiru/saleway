import { Search } from 'lucide-react';

import type { ProductWithRating } from '@/features/product/types/product';

import { ProductGrid } from '@/features/product/components/ProductGrid';
import { Button } from '@/lib/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/lib/components/ui/empty';
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

interface SearchResultsGridProps {
  products: ProductWithRating[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function SearchResultsGrid({
  products,
  totalProducts,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}: SearchResultsGridProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalProducts);

  return (
    <div className="flex h-full flex-col">
      <output aria-live="polite" className="mb-6 block text-sm text-muted-foreground">
        Showing {totalProducts > 0 ? startIndex + 1 : 0}–{endIndex} of {totalProducts} items
      </output>

      <ScrollArea className="h-[calc(100vh-300px)] pr-4">
        <section aria-label="Search results">
          <ProductGrid priorityCount={6} products={products} />
        </section>

        {totalProducts === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Empty className="border-none p-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Search aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>No products found</EmptyTitle>
                <EmptyDescription>We couldn't find any products matching your current filters.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={() => onPageChange(1)} variant="outline">
                  Reset search
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          totalProducts > itemsPerPage && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className="hover:cursor-pointer"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) onPageChange(currentPage - 1);
                      }}
                    />
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
                          <PaginationItem key={`${page}-ellipsis`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          className="hover:cursor-pointer"
                          href="#"
                          isActive={isCurrent}
                          onClick={(e) => {
                            e.preventDefault();
                            onPageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      className="hover:cursor-pointer"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) onPageChange(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )
        )}
      </ScrollArea>
    </div>
  );
}

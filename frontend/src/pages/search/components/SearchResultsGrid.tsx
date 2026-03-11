import { Search } from 'lucide-react';
import Link from 'next/link';
import { ProductGrid } from '@/features/product/components/ProductGrid';
import type { ProductWithRating } from '@/features/product/types/product';
import { Button } from '@/lib/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/lib/components/ui/empty';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { SEARCH_ROUTE } from '@/lib/constants/routes';

interface SearchResultsGridProps {
  products: ProductWithRating[];
  totalProducts: number;
  startIndex: number;
  endIndex: number;
}

export function SearchResultsGrid({ products, totalProducts, startIndex, endIndex }: SearchResultsGridProps) {
  return (
    <div className="mt-6 lg:mt-0 lg:col-span-3">
      <output aria-live="polite" className="block text-sm text-muted-foreground mb-4">
        Showing {totalProducts > 0 ? startIndex + 1 : 0}–{endIndex} of {totalProducts} items
      </output>

      <ScrollArea className="h-[calc(100vh-300px)] pr-4">
        <section aria-label="Search results">
          <ProductGrid products={products} />
        </section>

        {totalProducts === 0 && (
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
                <Link href={SEARCH_ROUTE} prefetch={false}>
                  <Button variant="outline">Clear all filters</Button>
                </Link>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

import { Search } from 'lucide-react';
import Link from 'next/link';
import { ProductGrid } from '@/features/product/components/ProductGrid';
import type { ProductWithRating } from '@/features/product/types/product';
import { Button } from '@/lib/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/lib/components/ui/empty';
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
    </div>
  );
}

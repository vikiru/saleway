'use client';

import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FilterSection } from '@/features/product/components/FilterSection';
import { ProductGrid } from '@/features/product/components/ProductGrid';
import type { Product, ProductWithRating } from '@/features/product/types/product';
import { Button } from '@/lib/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/components/ui/dialog';
import { Input } from '@/lib/components/ui/input';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';

const ITEMS_PER_PAGE = 9;

interface SearchPageProps {
  initialProducts: Product[];
}

export function SearchPage({ initialProducts }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = Array.from(new Set(initialProducts.map((p) => p.category)))
    .sort()
    .map((cat) => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }));

  const brands = Array.from(new Set(initialProducts.map((p) => p.brand)))
    .sort()
    .map((brand) => ({ id: brand.toLowerCase(), label: brand }));

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const filteredProducts = (
    initialProducts.filter((product) => {
      const min = minPrice === '' ? 0 : Number(minPrice);
      const max = maxPrice === '' ? Infinity : Number(maxPrice);
      const matchesPrice = product.price >= min && product.price <= max;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.some((b) => b.toLowerCase() === product.brand.toLowerCase());
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPrice && matchesCategory && matchesBrand && matchesSearch;
    }) as ProductWithRating[]
  ).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6 pt-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Shop All</h1>
          </div>

          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                type="search"
                value={searchQuery}
              />
            </div>

            <Select onValueChange={setSortBy} value={sortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

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
                      maxPrice={maxPrice}
                      minPrice={minPrice}
                      onBrandsChange={setSelectedBrands}
                      onCategoriesChange={setSelectedCategories}
                      onMaxPriceChange={setMaxPrice}
                      onMinPriceChange={setMinPrice}
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
              maxPrice={maxPrice}
              minPrice={minPrice}
              onBrandsChange={setSelectedBrands}
              onCategoriesChange={setSelectedCategories}
              onMaxPriceChange={setMaxPrice}
              onMinPriceChange={setMinPrice}
              selectedBrands={selectedBrands}
              selectedCategories={selectedCategories}
            />
          </aside>

          <div className="mt-6 lg:mt-0 lg:col-span-3">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{endIndex} of {filteredProducts.length} items
            </p>

            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <ProductGrid products={currentProducts} />

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your filters.</p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setMinPrice('');
                      setMaxPrice('');
                      setSelectedCategories([]);
                      setSelectedBrands([]);
                    }}
                    variant="link"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </ScrollArea>

            {filteredProducts.length > ITEMS_PER_PAGE && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1;
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
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                      />
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

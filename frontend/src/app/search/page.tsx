'use client';

import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterSection } from '@/lib/components/features/products/FilterSection';
import { ProductGrid } from '@/lib/components/features/products/ProductGrid';
import type { Product } from '@/lib/types/product';

const ITEMS_PER_PAGE = 9;

const categories = [
  { id: 'electronics', label: 'Electronics' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'home', label: 'Home & Living' },
  { id: 'accessories', label: 'Accessories' },
];

const brands = [
  { id: 'lumina', label: 'Lumina' },
  { id: 'vortex', label: 'Vortex' },
  { id: 'apex', label: 'Apex' },
  { id: 'zenith', label: 'Zenith' },
  { id: 'horizon', label: 'Horizon' },
];

const mockProducts: Product[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `Premium Product ${i + 1}`,
  brand: i % 2 === 0 ? 'Lumina' : 'Vortex',
  category: i % 3 === 0 ? 'electronics' : 'fashion',
  summary: '',
  description: '',
  price: 99.99 + i * 10,
  createdAt: '',
  updatedAt: '',
  image: {
    id: i + 1,
    productId: i + 1,
    imageUrl: `https://placehold.co/400x400/png?text=Product+${i + 1}`,
    imageAuthor: '',
    altText: '',
    attribution: '',
    createdAt: '',
    updatedAt: '',
  },
}));

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const filteredProducts = mockProducts
    .filter((product) => {
      const min = minPrice === '' ? 0 : Number(minPrice);
      const max = maxPrice === '' ? Infinity : Number(maxPrice);
      const matchesPrice = product.price >= min && product.price <= max;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.some((b) => b.toLowerCase() === product.brand.toLowerCase());
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPrice && matchesCategory && matchesBrand && matchesSearch;
    })
    .sort((a, b) => {
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

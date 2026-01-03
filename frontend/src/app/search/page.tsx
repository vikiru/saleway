'use client';

import { Filter, Search, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Separator } from '@/components/ui/separator';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);

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

  const products = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: `Premium Product ${i + 1}`,
    brand: i % 2 === 0 ? 'Lumina' : 'Vortex',
    price: 99.99 + i * 10,
    rating: 4.0 + (i % 10) * 0.1,
    reviewCount: 50 + i * 5,
    image: `https://placehold.co/400x400/png?text=Product+${i + 1}`,
    category: i % 3 === 0 ? 'electronics' : 'fashion',
  }));

  const filteredProducts = products
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedBrands, minPrice, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const toggleFilter = (list: string[], setList: Function, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const FilterSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div className="flex items-center space-x-2" key={category.id}>
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                id={`cat-${category.id}`}
                onCheckedChange={() => toggleFilter(selectedCategories, setSelectedCategories, category.id)}
              />
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={`cat-${category.id}`}
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Brand</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div className="flex items-center space-x-2" key={brand.id}>
              <Checkbox
                checked={selectedBrands.includes(brand.id)}
                id={`brand-${brand.id}`}
                onCheckedChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand.id)}
              />
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor={`brand-${brand.id}`}
              >
                {brand.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="flex items-center space-x-4">
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="min-price">
              Min
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-2.5 text-sm text-muted-foreground">$</span>
              <Input
                className="pl-6"
                id="min-price"
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                type="number"
                value={minPrice}
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="max-price">
              Max
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-2.5 text-sm text-muted-foreground">$</span>
              <Input
                className="pl-6"
                id="max-price"
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="∞"
                type="number"
                value={maxPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
                    <FilterSection />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-24 lg:grid lg:grid-cols-4 lg:gap-x-8">
          <aside className="hidden lg:block">
            <FilterSection />
          </aside>

          <div className="mt-6 lg:mt-0 lg:col-span-3">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{endIndex} of {filteredProducts.length} items
            </p>

            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {currentProducts.map((product) => (
                  <Link className="group" href={`/products/${product.id}`} key={product.id}>
                    <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-0 bg-transparent ring-0 shadow-none hover:bg-card">
                      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 relative">
                        <img
                          alt={product.name}
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          src={product.image}
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{product.brand}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                                key={i}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                        </div>
                        <div className="mt-2 font-semibold text-lg">${product.price.toFixed(2)}</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

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

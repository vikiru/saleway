'use client';

import { X } from 'lucide-react';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
import { Separator } from '@/lib/components/ui/separator';

interface FilterItem {
  id: string;
  label: string;
}

interface FilterSectionProps {
  categories: FilterItem[];
  brands: FilterItem[];
  selectedCategories: string[];
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  onFilterChange: (key: string, value: string) => void;
  onPriceApply: () => void;
  onReset: () => void;
}

export function FilterSection({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  onFilterChange,
  onPriceApply,
  onReset,
}: FilterSectionProps) {
  const categoryValue = selectedCategories[0] || 'all';
  const brandValue = selectedBrands[0]?.toLowerCase() || 'all';

  return (
    <aside aria-label="Filters" className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Filters</h3>
        <Button
          aria-label="Reset all filters"
          className="h-8 px-2 text-muted-foreground hover:text-foreground flex items-center gap-1.5"
          onClick={onReset}
          size="sm"
          variant="ghost"
        >
          <X aria-hidden="true" className="h-4 w-4" />
          <span>Reset</span>
        </Button>
      </div>

      <Separator aria-hidden="true" />

      <div className="space-y-4">
        <div className="grid gap-2">
          <div className="text-sm font-medium leading-none" id="category-label">
            Category
          </div>
          <Select onValueChange={(v) => onFilterChange('category', v)} value={categoryValue}>
            <SelectTrigger aria-labelledby="category-label" className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="text-sm font-medium leading-none" id="brand-label">
            Brand
          </div>
          <Select onValueChange={(v) => onFilterChange('brand', v)} value={brandValue}>
            <SelectTrigger aria-labelledby="brand-label" className="w-full">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator aria-hidden="true" />

      <fieldset className="p-0 border-none m-0">
        <legend className="text-lg font-semibold mb-4">Price Range</legend>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="grid gap-1.5">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="min-price">
                Min Price
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-2.5 top-2.5 text-sm text-muted-foreground">
                  $
                </span>
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
                Max Price
              </label>
              <div className="relative">
                <span aria-hidden="true" className="absolute left-2.5 top-2.5 text-sm text-muted-foreground">
                  $
                </span>
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
          <Button className="w-full" onClick={onPriceApply} size="sm" variant="outline">
            Apply Price
          </Button>
        </div>
      </fieldset>
    </aside>
  );
}

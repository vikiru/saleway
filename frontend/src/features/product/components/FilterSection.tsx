'use client';

import { Checkbox } from '@/lib/components/ui/checkbox';
import { Input } from '@/lib/components/ui/input';
import { Button } from '@/lib/components/ui/button';
import { Separator } from '@/lib/components/ui/separator';
import { useProductFilters } from '@/features/product/hooks/useProductFilters';

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
}

export function FilterSection({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  minPrice: initialMinPrice,
  maxPrice: initialMaxPrice,
}: FilterSectionProps) {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice, handleCategoryChange, handleBrandChange, handlePriceApply } =
    useProductFilters({
      selectedCategories,
      selectedBrands,
      initialMinPrice,
      initialMaxPrice,
    });

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div className="flex items-center space-x-2" key={category.id}>
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                id={`cat-${category.id}`}
                onCheckedChange={() => handleCategoryChange(category.id)}
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
                onCheckedChange={() => handleBrandChange(brand.id)}
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
        <div className="space-y-4">
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
          <Button className="w-full" onClick={handlePriceApply} size="sm" variant="outline">
            Apply Price
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { ArrowDown01, ArrowUp01 } from 'lucide-react';
import { useSortRoute } from '@/features/product/hooks/useSortRoute';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';

interface SortSelectProps {
  defaultValue?: string;
}

export function SortSelect({ defaultValue }: SortSelectProps) {
  const { handleSortChange } = useSortRoute();

  return (
    <Select defaultValue={defaultValue || 'price-asc'} onValueChange={handleSortChange}>
      <SelectTrigger aria-label="Sort products" className="w-[200px] hover:cursor-pointer">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="hover:cursor-pointer" value="price-asc">
          <div className="flex items-center gap-2">
            <ArrowUp01 aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            <span>Price: Low to High</span>
          </div>
        </SelectItem>
        <SelectItem className="hover:cursor-pointer" value="price-desc">
          <div className="flex items-center gap-2">
            <ArrowDown01 aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            <span>Price: High to Low</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

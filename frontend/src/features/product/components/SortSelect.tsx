'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
import { useSortRoute } from '@/features/product/hooks/useSortRoute';

interface SortSelectProps {
  defaultValue?: string;
}

export function SortSelect({ defaultValue }: SortSelectProps) {
  const { handleSortChange } = useSortRoute();

  return (
    <Select defaultValue={defaultValue || 'price-asc'} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
}

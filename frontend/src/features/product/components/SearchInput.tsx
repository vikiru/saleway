'use client';

import { Search } from 'lucide-react';
import { useSearchRoute } from '@/features/product/hooks/useSearchRoute';

interface SearchInputProps {
  defaultValue?: string;
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const { handleSearch } = useSearchRoute();

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
        defaultValue={defaultValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e.currentTarget.value);
          }
        }}
        placeholder="Search products..."
        type="search"
      />
    </div>
  );
}

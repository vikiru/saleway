'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeferredValue, useEffect, useState } from 'react';
import { useSearchRoute } from '@/features/product/hooks/useSearchRoute';
import { SEARCH_ROUTE } from '@/lib/constants/routes';

interface SearchInputProps {
  defaultValue?: string;
}

export function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();
  const { handleSearch } = useSearchRoute();
  const [value, setValue] = useState(defaultValue || '');
  const deferredValue = useDeferredValue(value);

  useEffect(() => {
    if (deferredValue !== defaultValue) {
      handleSearch(deferredValue, { replace: true });
    }
  }, [deferredValue, handleSearch, defaultValue]);

  const handleClear = () => {
    setValue('');
    router.push(SEARCH_ROUTE);
  };

  return (
    <div className="relative w-full max-w-sm group">
      <Search
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
      />
      <input
        aria-label="Search products"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 pr-9"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        type="search"
        value={value}
      />
      {value && (
        <button
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer flex items-center justify-center p-0.5"
          onClick={handleClear}
          type="button"
        >
          <X aria-hidden="true" className="h-full w-full" />
        </button>
      )}
    </div>
  );
}

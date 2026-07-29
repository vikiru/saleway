'use client';

import { Search, X } from 'lucide-react';
import { useDeferredValue, useEffect, useState } from 'react';

interface SearchInputProps {
  value?: string;
  onSearch: (value: string) => void;
}

export function SearchInput({ value: parentValue = '', onSearch }: SearchInputProps) {
  const [value, setValue] = useState(parentValue);
  const deferredValue = useDeferredValue(value);

  useEffect(() => {
    if (parentValue === '') {
      setValue('');
    }
  }, [parentValue]);

  useEffect(() => {
    onSearch(deferredValue);
  }, [deferredValue, onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
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
        type="text"
        value={value}
      />
      {value && (
        <button
          aria-label="Clear search"
          className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer flex items-center justify-center group/clear"
          onClick={handleClear}
          type="button"
        >
          <X aria-hidden="true" className="h-4 w-4 transition-transform group-hover/clear:scale-110" />
        </button>
      )}
    </div>
  );
}

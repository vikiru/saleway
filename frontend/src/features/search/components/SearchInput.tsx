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
    <div className="group relative w-full max-w-sm">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        aria-label="Search products"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-9 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        type="text"
        value={value}
      />
      {value && (
        <button
          aria-label="Clear search"
          className="group/clear absolute top-0 right-0 flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground"
          onClick={handleClear}
          type="button"
        >
          <X aria-hidden="true" className="h-4 w-4 transition-transform group-hover/clear:scale-110" />
        </button>
      )}
    </div>
  );
}

import { Filter } from 'lucide-react';

import { SearchInput } from '@/features/product/components/SearchInput';
import { SortSelect } from '@/features/product/components/SortSelect';
import { Button } from '@/lib/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/components/ui/dialog';

interface SearchHeaderProps {
  searchTerm?: string;
  sortBy?: string;
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  filterContent: React.ReactNode;
}

export function SearchHeader({ searchTerm, sortBy, onSearch, onSort, filterContent }: SearchHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b pt-12 pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1>Shop All</h1>
      </div>

      <div className="flex flex-1 items-center justify-end space-x-4">
        <SearchInput onSearch={onSearch} value={searchTerm} />
        <SortSelect onValueChange={onSort} value={sortBy} />

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
              <div className="mt-4">{filterContent}</div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

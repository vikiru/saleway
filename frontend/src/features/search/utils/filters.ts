import type { Product } from '@/entities/product/types/product';

export interface FilterItem {
  id: string;
  label: string;
}

export function deriveFilterOptions(products: Product[]) {
  const categories: FilterItem[] = Array.from(new Set(products.map((p) => p.category)))
    .toSorted()
    .map((cat) => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }));

  const brands: FilterItem[] = Array.from(new Set(products.map((p) => p.brand)))
    .toSorted()
    .map((brand) => ({ id: brand.toLowerCase(), label: brand }));

  return { categories, brands };
}

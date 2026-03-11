import type { Product } from '../types/product';

export interface FilterItem {
  id: string;
  label: string;
}

export function deriveFilterOptions(products: Product[]) {
  const categories: FilterItem[] = Array.from(new Set(products.map((p) => p.category)))
    .sort()
    .map((cat) => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }));

  const brands: FilterItem[] = Array.from(new Set(products.map((p) => p.brand)))
    .sort()
    .map((brand) => ({ id: brand.toLowerCase(), label: brand }));

  return { categories, brands };
}

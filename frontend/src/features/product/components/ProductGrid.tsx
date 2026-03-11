import type { ProductWithRating } from '@/features/product/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: ProductWithRating[];
  priorityCount?: number;
}

export function ProductGrid({ products, priorityCount = 0 }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} priority={index < priorityCount} product={product} />
      ))}
    </div>
  );
}

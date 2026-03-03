'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/lib/types/product';

interface ProductWithRating extends Product {
  rating?: number;
  reviewCount?: number;
}

interface ProductGridProps {
  products: ProductWithRating[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product) => (
        <Link className="group" href={`/products/${product.id}`} key={product.id} prefetch={false}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-0 bg-transparent ring-0 shadow-none hover:bg-card">
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 relative">
              <img
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                src={product.image?.imageUrl ?? `https://placehold.co/400x400/png?text=${product.name}`}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.brand}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      className={`h-3 w-3 ${i < Math.floor(product.rating ?? 0) ? 'fill-current' : 'text-gray-300'}`}
                      key={`star-${product.id}-${i}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviewCount ?? 0})</span>
              </div>
              <div className="mt-2 font-semibold text-lg">${product.price?.toFixed(2) ?? '0.00'}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

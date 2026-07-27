'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/features/product/types/product';
import { useProductAverageRating } from '@/features/rating/queries/rating';
import { Card, CardContent } from '@/lib/components/ui/card';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const { data: ratingData } = useProductAverageRating(product.id.toString());

  const rating = ratingData?.average_rating ?? 0;

  return (
    <Link
      aria-label={`View details for ${product.name}`}
      className="group block h-full rounded-xl focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:border-ring transition-shadow"
      href={`/products/${product.id}`}
      prefetch={false}
    >
      <Card className="h-full overflow-hidden border-0 bg-transparent ring-0 shadow-none hover:bg-card">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted relative">
          <Image
            alt={product.image?.alt_text || product.name}
            className="h-full w-full object-cover object-center"
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={
              product.image?.image_url || `https://placehold.co/400x400/png?text=${encodeURIComponent(product.name)}`
            }
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.brand}</p>
          <div className="mt-2 flex items-center gap-2">
            <div aria-label={`Rated ${rating} out of 5 stars`} className="flex text-yellow-500" role="img">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  aria-hidden="true"
                  className={`h-3 w-3 ${star <= Math.floor(rating) ? 'fill-current' : 'text-muted'}`}
                  key={`star-${product.id}-${star}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 font-semibold text-lg">${product.price ? Number(product.price).toFixed(2) : '0.00'}</div>
        </CardContent>
      </Card>
    </Link>
  );
}

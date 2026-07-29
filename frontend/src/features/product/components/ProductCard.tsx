'use client';

import { Package, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/features/product/types/product';
import { useProductAverageRating } from '@/features/rating/queries/rating';
import { Card, CardContent } from '@/lib/components/ui/card';

interface ProductCardProps {
  product: Product;
  rating?: number;
  priority?: boolean;
}

export function ProductCard({ product, rating, priority }: ProductCardProps) {
  const { data: ratingData } = useProductAverageRating(String(product.id));
  const finalRating = rating ?? ratingData?.average_rating ?? 0;

  return (
    <Link
      aria-label={`View details for ${product.name}`}
      className="group block h-full rounded-xl focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:border-ring"
      href={`/products/${product.id}`}
      prefetch={false}
    >
      <Card className="h-full overflow-hidden border-0 bg-transparent ring-0 shadow-none transition-colors duration-300 hover:bg-muted/30">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted relative">
          {product.image?.image_url ? (
            <Image
              alt={product.image?.alt_text || product.name}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={product.image.image_url}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <CardContent className="p-4 pt-5">
          <h3 className="font-heading text-base font-semibold text-foreground line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.brand}</p>
          <div className="mt-3 flex items-center gap-2">
            <div aria-label={`Rated ${finalRating} out of 5 stars`} className="flex text-amber-500" role="img">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 ${star <= Math.floor(finalRating) ? 'fill-current' : 'text-muted'}`}
                  key={`star-${product.id}-${star}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 font-heading font-bold text-lg text-foreground tracking-tight">
            ${product.price ? Number(product.price).toFixed(2) : '0.00'}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

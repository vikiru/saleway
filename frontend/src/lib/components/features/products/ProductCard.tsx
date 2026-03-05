import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/lib/types/product';

interface ProductCardProps {
  product: Product & { rating?: number; reviewCount?: number };
}

export function ProductCard({ product }: ProductCardProps) {
  const rating = product.rating ?? 0;
  const reviewCount = product.reviewCount ?? 0;

  return (
    <Link className="group block h-full" href={`/products/${product.id}`} prefetch={false}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-0 bg-transparent ring-0 shadow-none hover:bg-card">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted relative">
          <Image
            alt={product.image?.altText || product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={product.image?.image_url || `https://placehold.co/400x400/png?text=${encodeURIComponent(product.name)}`}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.brand}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-muted'}`}
                  key={`star-${product.id}-${i}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
          <div className="mt-2 font-semibold text-lg">
            ${product.price ? Number(product.price).toFixed(2) : '0.00'}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

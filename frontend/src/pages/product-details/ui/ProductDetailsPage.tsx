'use client';

import { ProductBreadcrumb } from '@/features/product/components/ProductBreadcrumb';
import { ProductDescription } from '@/features/product/components/ProductDescription';
import { ProductGallery } from '@/features/product/components/ProductGallery';
import { ProductInfo } from '@/features/product/components/ProductInfo';
import { ProductRating } from '@/features/product/components/ProductRating';
import { ReviewsList } from '@/features/product/components/ReviewsList';
import type { Product } from '@/features/product/types/product';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductDetailsPageProps {
  product: Product;
}

export function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const mockReviews: Review[] = Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 1),
    userId: `user_${i + 1}`,
    userName: `User ${i + 1}`,
    rating: 4,
    comment:
      'This product exceeded my expectations. The quality is amazing and it arrived faster than I thought. Highly recommended!',
    createdAt: new Date('2024-03-01T10:00:00Z').toISOString(),
  }));

  const productInfoProps = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    inStock: true,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductBreadcrumb productName={product.name} />

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <ProductGallery image_url={product.image?.image_url} name={product.name} />

          <div>
            <ProductRating rating={4.8} reviewCount={24} />
            <ProductInfo product={productInfoProps} />
          </div>
        </div>

        <ProductDescription longDescription={product.description} shortDescription={product.summary} />

        <ReviewsList productId={String(product.id)} reviews={mockReviews} />
      </div>
    </div>
  );
}

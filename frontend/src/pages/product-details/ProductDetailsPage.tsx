import { ProductBreadcrumb } from '@/features/product/components/ProductBreadcrumb';
import { ProductDescription } from '@/features/product/components/ProductDescription';
import { ProductGallery } from '@/features/product/components/ProductGallery';
import { ProductInfo } from '@/features/product/components/ProductInfo';
import type { Product } from '@/features/product/types/product';
import { ProductRating } from '@/features/rating/components/ProductRating';
import { ReviewsList } from '@/features/rating/components/ReviewsList';
import type { Review } from '@/features/rating/types/rating';

interface ProductDetailsPageProps {
  product: Product;
  reviews: Review[];
}

export function ProductDetailsPage({ product, reviews }: ProductDetailsPageProps) {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  const ratingStats = {
    average:
      safeReviews.length > 0 ? safeReviews.reduce((acc: number, r) => acc + r.rating, 0) / safeReviews.length : 0,
    count: safeReviews.length,
  };

  const productInfoProps = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    inStock: true,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-none px-4 py-8 sm:px-6 lg:px-12">
        <ProductBreadcrumb productName={product.name} />

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <ProductGallery image_url={product.image?.image_url} name={product.name} />

          <div>
            <ProductRating rating={ratingStats.average} review_count={ratingStats.count} />
            <ProductInfo product={productInfoProps} />
          </div>
        </div>

        <ProductDescription longDescription={product.description} shortDescription={product.summary} />

        <ReviewsList productId={String(product.id)} reviews={reviews} />
      </div>
    </div>
  );
}

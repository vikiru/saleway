import { ProductBreadcrumb } from '@/features/product/components/ProductBreadcrumb';
import { ProductDescription } from '@/features/product/components/ProductDescription';
import { ProductGallery } from '@/features/product/components/ProductGallery';
import { ProductInfo } from '@/features/product/components/ProductInfo';
import type { Product } from '@/features/product/types/product';
import { ProductRating } from '@/features/rating/components/ProductRating';
import { ReviewsList } from '@/features/rating/components/ReviewsList';
import type { ProductReviewsResponse } from '@/features/rating/types/rating';

interface ProductDetailsPageProps {
  product: Product;
  reviewsData?: ProductReviewsResponse['data'];
}

export function ProductDetailsPage({ product, reviewsData }: ProductDetailsPageProps) {
  const reviews = reviewsData?.reviews || [];
  const ratingStats = {
    average: reviewsData?.average_rating || 0,
    count: reviewsData?.total_reviews || 0,
  };

  const productInfoProps = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    inStock: true,
  };

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-none px-4 py-8 sm:px-6 lg:px-12">
        <ProductBreadcrumb productName={product.name} />

        <div className="md:grid md:grid-cols-2 md:gap-x-8 lg:gap-x-12 xl:gap-x-16">
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

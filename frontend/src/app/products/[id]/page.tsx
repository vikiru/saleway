import { getProduct } from '@/lib/api/product';
import { ProductBreadcrumb } from '@/lib/components/features/products/ProductBreadcrumb';
import { ProductDescription } from '@/lib/components/features/products/ProductDescription';
import { ProductGallery } from '@/lib/components/features/products/ProductGallery';
import { ProductInfo } from '@/lib/components/features/products/ProductInfo';
import { ProductRating } from '@/lib/components/features/products/ProductRating';
import { ReviewsList } from '@/lib/components/features/products/ReviewsList';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  const productResponse = getProduct(numericId);

  if (!productResponse.success || !productResponse.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const product = productResponse.data;

  const mockReviews: Review[] = Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 1),
    userId: `user_${i + 1}`,
    userName: `User ${i + 1}`,
    rating: 4,
    comment:
      'This product exceeded my expectations. The quality is amazing and it arrived faster than I thought. Highly recommended!',
    createdAt: new Date(Date.now() - (i + 1) * 2 * 24 * 60 * 60 * 1000).toISOString(),
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
          <ProductGallery imageUrl={product.image.imageUrl} name={product.name} />

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

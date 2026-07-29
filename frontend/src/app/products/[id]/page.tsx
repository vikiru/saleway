import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/features/product/api/product';
import { getProductReviewsAction } from '@/features/rating/actions/rating';
import { ProductDetailsPage } from '@/views/product-details/ProductDetailsPage';

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  const [product, reviewsData] = await Promise.all([getProduct(numericId), getProductReviewsAction(id)]);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPage product={product} reviewsData={reviewsData} />;
}

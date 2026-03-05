import { getProduct, getProducts } from '@/features/product/api/product';
import { ProductDetailsPage } from '@/pages/product-details/ui/ProductDetailsPage';
import { notFound } from 'next/navigation';
import type { Review } from '@/features/product/types/product';

export const dynamicParams = false;

export async function generateStaticParams() {
  const productsResponse = getProducts();
  return (productsResponse.data || []).map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  const productResponse = getProduct(numericId);

  if (!productResponse.success || !productResponse.data) {
    notFound();
  }

  const reviews: Review[] = [];

  return <ProductDetailsPage product={productResponse.data} reviews={reviews} />;
}

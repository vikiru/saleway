import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/features/product/api/product';
import type { Review } from '@/features/product/types/product';
import { ProductDetailsPage } from '@/pages/product-details/ProductDetailsPage';

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  const product = getProduct(numericId);

  if (!product) {
    notFound();
  }

  const reviews: Review[] = [];

  return <ProductDetailsPage product={product} reviews={reviews} />;
}

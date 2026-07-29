import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/features/product/api/product';
import { getProductReviewsAction } from '@/features/rating/actions/rating';
import { ProductDetailsPage } from '@/views/product-details/ProductDetailsPage';

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(parseInt(id, 10));
  if (!product) return {};

  return {
    title: `${product.name} - Saleway`,
    description: product.summary,
  };
}

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

import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/features/product/api/product';
import { ProductDetailsPage } from '@/pages/product-details/ProductDetailsPage';

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

  const product = await getProduct(numericId);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPage product={product} />;
}

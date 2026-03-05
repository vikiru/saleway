import { getProduct, getProducts } from '@/features/product/api/product';
import { ProductDetailsPage } from '@/pages/product-details/ui/ProductDetailsPage';

export async function generateStaticParams() {
  const productsResponse = getProducts();
  const products = productsResponse.data || [];

  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
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

  return <ProductDetailsPage product={productResponse.data} />;
}

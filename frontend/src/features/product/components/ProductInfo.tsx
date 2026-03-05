import { Badge } from '@/lib/components/ui/badge';
import { AddToCartButton } from './AddToCartButton';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="mt-4 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">{product.name}</h1>

      <p className="mt-4 text-3xl tracking-tight text-foreground">${product.price.toFixed(2)}</p>

      <div className="mt-6">
        {product.inStock ? (
          <Badge className="bg-green-100 text-green-800" variant="secondary">
            In Stock
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800" variant="secondary">
            Out of Stock
          </Badge>
        )}
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <AddToCartButton disabled={!product.inStock} price={product.price} productId={product.id} />
      </div>
    </div>
  );
}

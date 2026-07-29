import { ChevronRight, Clock, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/features/product/components/ProductCard';
import type { Product } from '@/features/product/types/product';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent } from '@/lib/components/ui/card';
import { SEARCH_ROUTE } from '@/lib/constants/routes';

interface HomePageProps {
  products: Product[];
}

export function HomePage({ products }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-background">
      <section className="relative bg-background overflow-hidden border-b">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto text-center space-y-8">
            <h1 className="mb-6 font-heading text-5xl font-light leading-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              Discover Quality, <br />
              <span className="font-bold">Experience Excellence</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl">
              Your one-stop destination for premium electronics, fashion, and home accessories. Curated collections
              designed to elevate your lifestyle.
            </p>
            <div className="flex justify-center gap-4">
              <Link href={SEARCH_ROUTE}>
                <Button size="xl">
                  Shop Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
              <Link className="text-primary hover:underline font-medium" href={SEARCH_ROUTE}>
                View all products
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} priority={index < 4} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-none shadow-sm hover:shadow-md bg-card transition-all duration-300 ease-out">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-5">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Truck className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-tight">Free Shipping</h3>
                  <p className="text-muted-foreground leading-relaxed">Free delivery on all orders over $50</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md bg-card transition-all duration-300 ease-out">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-5">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-tight">Secure Payment</h3>
                  <p className="text-muted-foreground leading-relaxed">100% secure payment processing</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md bg-card transition-all duration-300 ease-out">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-5">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-tight">24/7 Support</h3>
                  <p className="text-muted-foreground leading-relaxed">Dedicated customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

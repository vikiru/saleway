import { ChevronRight, Clock, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/features/product/types/product';

import { ProductCard } from '@/features/product/components/ProductCard';
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
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto space-y-8 text-center">
            <h1 className="mb-6 font-heading text-5xl leading-tight font-light text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
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
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
              <Link className="font-medium text-primary hover:underline" href={SEARCH_ROUTE}>
                View all products
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} priority={index < 4} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <Card className="border-none bg-card shadow-sm transition-all duration-300 ease-out hover:shadow-md">
              <CardContent className="flex flex-col items-center space-y-5 p-8 text-center">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  <Truck className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-tight">Free Shipping</h3>
                  <p className="leading-relaxed text-muted-foreground">Free delivery on all orders over $50</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card shadow-sm transition-all duration-300 ease-out hover:shadow-md">
              <CardContent className="flex flex-col items-center space-y-5 p-8 text-center">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-tight">Secure Payment</h3>
                  <p className="leading-relaxed text-muted-foreground">100% secure payment processing</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card shadow-sm transition-all duration-300 ease-out hover:shadow-md">
              <CardContent className="flex flex-col items-center space-y-5 p-8 text-center">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold tracking-tight">24/7 Support</h3>
                  <p className="leading-relaxed text-muted-foreground">Dedicated customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

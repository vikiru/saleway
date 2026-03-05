'use client';

import { ChevronRight, Clock, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/lib/components/ui/button';
import { Card, CardContent } from '@/lib/components/ui/card';
import { SEARCH_ROUTE } from '@/lib/constants/routes';

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-background overflow-hidden border-b">
        <div className="container mx-auto px-4 py-24 md:py-32">
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

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md bg-card/50 hover:bg-card transition-colors">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Truck className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Free Shipping</h3>
                  <p className="text-muted-foreground">Free delivery on all orders over $50</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-card/50 hover:bg-card transition-colors">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Shield className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Secure Payment</h3>
                  <p className="text-muted-foreground">100% secure payment processing</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-card/50 hover:bg-card transition-colors">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">24/7 Support</h3>
                  <p className="text-muted-foreground">Dedicated customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

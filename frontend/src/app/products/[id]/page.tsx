'use client';

import { Check, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailsPage() {
  const [qty, setQty] = useState(1);

  const product = {
    name: 'Elegant Leather Satchel',
    price: 192.0,
    rating: 4.8,
    reviewCount: 24,
    description:
      'Crafted from high-quality full-grain leather, this satchel combines timeless style with modern functionality. Features multiple compartments for organization and a durable adjustable strap.',
    longDescription:
      'This premium leather satchel is the perfect companion for your daily commute or weekend adventures. Made from sustainably sourced leather that ages beautifully over time. The interior features a padded laptop sleeve, multiple zippered pockets, and a spacious main compartment. The brass hardware adds a touch of sophistication, while the reinforced stitching ensures durability.',
    inStock: true,
  };

  const handleQtyChange = (type: 'inc' | 'dec') => {
    if (type === 'dec' && qty > 1) setQty(qty - 1);
    if (type === 'inc') setQty(qty + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
              <img
                alt={product.name}
                className="h-full w-full object-cover object-center"
                src="https://placehold.co/600x600/png?text=Product+Image"
              />
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>

            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-foreground">${product.price.toFixed(2)}</p>
            </div>

            <div className="mt-4 flex items-center">
              <div className="flex items-center space-x-1">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    className={`h-5 w-5 ${
                      product.rating > rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                    }`}
                    key={rating}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer">
                {product.reviewCount} reviews
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <p className="text-base text-muted-foreground">{product.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <Check aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-green-500" />
              <p className="ml-2 text-sm text-muted-foreground">In stock and ready to ship</p>
            </div>

            <Separator className="my-8" />

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  className="h-10 w-10 rounded-none border-r"
                  disabled={qty <= 1}
                  onClick={() => handleQtyChange('dec')}
                  size="icon"
                  variant="ghost"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex h-10 w-12 items-center justify-center text-center text-sm font-medium">{qty}</div>
                <Button
                  className="h-10 w-10 rounded-none border-l"
                  onClick={() => handleQtyChange('inc')}
                  size="icon"
                  variant="ghost"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button className="flex-1 h-10" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to cart
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Description</h3>
          <div className="mt-6 space-y-6 text-base text-muted-foreground">
            <p>{product.longDescription}</p>
          </div>
        </div>

        <Separator className="my-12" />

        <section className="bg-background">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Customer Reviews</h2>
            <Button variant="outline">Write a review</Button>
          </div>

          <ScrollArea className="h-[600px] pr-6">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card className="bg-card" key={i}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={`https://placehold.co/40x40/png?text=U${i}`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm font-medium">User Name {i}</CardTitle>
                          <div className="flex items-center mt-1">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <Star
                                className={`h-3 w-3 ${
                                  4 > rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                                }`}
                                key={rating}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This product exceeded my expectations. The quality is amazing and it arrived faster than I
                      thought. Highly recommended!
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </section>
      </div>
    </div>
  );
}

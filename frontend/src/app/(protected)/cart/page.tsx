'use client';

import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      quantity: 1,
      image: 'https://placehold.co/200x200/png?text=Headphones',
    },
    {
      id: 2,
      name: 'Leather Wallet',
      price: 49.99,
      quantity: 1,
      image: 'https://placehold.co/200x200/png?text=Wallet',
    },
    {
      id: 3,
      name: 'Smart Watch',
      price: 199.99,
      quantity: 1,
      image: 'https://placehold.co/200x200/png?text=Watch',
    },
    {
      id: 4,
      name: 'Running Shoes',
      price: 129.99,
      quantity: 1,
      image: 'https://placehold.co/200x200/png?text=Shoes',
    },
    {
      id: 5,
      name: 'Sunglasses',
      price: 159.99,
      quantity: 1,
      image: 'https://placehold.co/200x200/png?text=Sunglasses',
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = 15.0;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 border rounded-lg border-dashed">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Link href="/products">
                  <Button variant="outline">Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <Card className="overflow-hidden" key={item.id}>
                      <div className="p-4 sm:flex sm:items-center sm:justify-between sm:space-x-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img alt={item.name} className="h-24 w-24 rounded-md object-cover" src={item.image} />
                          </div>
                          <div>
                            <h3 className="text-base font-medium text-foreground">
                              <Link className="hover:underline" href={`/products/${item.id}`}>
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm font-medium text-muted-foreground">${item.price.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between sm:mt-0">
                          <div className="flex items-center border rounded-md mx-4">
                            <Button
                              className="h-8 w-8 rounded-none border-r"
                              disabled={item.quantity <= 1}
                              onClick={() => updateQuantity(item.id, -1)}
                              size="icon"
                              variant="ghost"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="w-10 text-center text-sm font-medium">{item.quantity}</div>
                            <Button
                              className="h-8 w-8 rounded-none border-l"
                              onClick={() => updateQuantity(item.id, 1)}
                              size="icon"
                              variant="ghost"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                            size="icon"
                            variant="ghost"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping estimate</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax estimate</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-base font-medium">
                  <span>Order total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">or </span>
                  <Link
                    className="font-medium text-primary hover:text-primary/80 inline-flex items-center"
                    href="/products"
                  >
                    Continue Shopping <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

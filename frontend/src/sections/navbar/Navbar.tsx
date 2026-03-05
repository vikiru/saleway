'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/lib/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import UserButton from './UserButton';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link className="flex items-center space-x-2" href="/">
            <span className="text-xl font-bold tracking-tight text-primary">Saleway</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium transition-colors hover:text-primary" href="/search">
              Shop
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
}

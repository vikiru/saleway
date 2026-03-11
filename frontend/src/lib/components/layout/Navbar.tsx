'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/features/user/components/ThemeToggle';
import UserButton from '@/features/user/components/UserButton';
import { Button } from '@/lib/components/ui/button';
import { CART_ROUTE, HOME_ROUTE } from '@/lib/constants/routes';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link className="flex items-center space-x-2" href={HOME_ROUTE}>
            <span className="text-xl font-bold tracking-tight text-primary">Saleway</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href={CART_ROUTE}>
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

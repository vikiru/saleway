'use client';

import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
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
          <Link className="group flex items-center gap-2 transition-opacity hover:opacity-80" href={HOME_ROUTE}>
            <span className="font-heading text-2xl font-bold tracking-tighter text-primary">Saleway.</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href={CART_ROUTE}>
            <Button size="icon" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
          <ClerkLoading>
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm" variant="outline">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </nav>
  );
}

'use client';
import { UserButton as ClerkButton, useUser } from '@clerk/nextjs';
import { House, ShoppingCart, LucideUser } from 'lucide-react';

export default function UserButton() {
  const { user } = useUser();

  return (
    <ClerkButton>
      <ClerkButton.MenuItems>
        <ClerkButton.Link href="/" label="Home" labelIcon={<House className="w-4 h-4" />} />
        <ClerkButton.Link href="/cart" label="Cart" labelIcon={<ShoppingCart className="w-4 h-4" />} />
        <ClerkButton.Link href="/dashboard" label="Dashboard" labelIcon={<LucideUser className="w-4 h-4" />} />
        <ClerkButton.Action label="manageAccount" />
      </ClerkButton.MenuItems>
    </ClerkButton>
  );
}

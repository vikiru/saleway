'use client';
import { UserButton as ClerkButton } from '@clerk/nextjs';
import { House, LayoutDashboard, Package, ShoppingCart } from 'lucide-react';

export default function UserButton() {
  return (
    <ClerkButton>
      <ClerkButton.MenuItems>
        <ClerkButton.Link href="/" label="Home" labelIcon={<House className="w-4 h-4" />} />
        <ClerkButton.Link href="/cart" label="Cart" labelIcon={<ShoppingCart className="w-4 h-4" />} />
        <ClerkButton.Link href="/orders" label="Orders" labelIcon={<Package className="w-4 h-4" />} />
        <ClerkButton.Link href="/dashboard" label="Dashboard" labelIcon={<LayoutDashboard className="w-4 h-4" />} />
        <ClerkButton.Action label="manageAccount" />
      </ClerkButton.MenuItems>
    </ClerkButton>
  );
}

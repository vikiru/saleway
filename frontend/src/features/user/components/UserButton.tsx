import { UserButton as ClerkButton } from '@clerk/nextjs';
import { House, LayoutDashboard, Package, ShoppingCart, Store } from 'lucide-react';

import { CART_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, ORDERS_ROUTE, SEARCH_ROUTE } from '@/shared/config/routes';

export default function UserButton() {
  return (
    <ClerkButton>
      <ClerkButton.MenuItems>
        <ClerkButton.Link href={HOME_ROUTE} label="Home" labelIcon={<House className="h-4 w-4" />} />
        <ClerkButton.Link
          href={DASHBOARD_ROUTE}
          label="Dashboard"
          labelIcon={<LayoutDashboard className="h-4 w-4" />}
        />
        <ClerkButton.Link href={SEARCH_ROUTE} label="Shop Products" labelIcon={<Store className="h-4 w-4" />} />
        <ClerkButton.Link href={CART_ROUTE} label="Cart" labelIcon={<ShoppingCart className="h-4 w-4" />} />
        <ClerkButton.Link href={ORDERS_ROUTE} label="Orders" labelIcon={<Package className="h-4 w-4" />} />
        <ClerkButton.Action label="manageAccount" />
      </ClerkButton.MenuItems>
    </ClerkButton>
  );
}

import { UserButton as ClerkButton } from '@clerk/nextjs';
import { House, LayoutDashboard, Package, ShoppingCart, Store } from 'lucide-react';
import { CART_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, ORDERS_ROUTE, SEARCH_ROUTE } from '@/lib/constants/routes';

export default function UserButton() {
  return (
    <ClerkButton>
      <ClerkButton.MenuItems>
        <ClerkButton.Link href={HOME_ROUTE} label="Home" labelIcon={<House className="w-4 h-4" />} />
        <ClerkButton.Link href={SEARCH_ROUTE} label="Shop Products" labelIcon={<Store className="w-4 h-4" />} />
        <ClerkButton.Link href={CART_ROUTE} label="Cart" labelIcon={<ShoppingCart className="w-4 h-4" />} />
        <ClerkButton.Link href={ORDERS_ROUTE} label="Orders" labelIcon={<Package className="w-4 h-4" />} />
        <ClerkButton.Link
          href={DASHBOARD_ROUTE}
          label="Dashboard"
          labelIcon={<LayoutDashboard className="w-4 h-4" />}
        />
        <ClerkButton.Action label="manageAccount" />
      </ClerkButton.MenuItems>
    </ClerkButton>
  );
}

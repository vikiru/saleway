import { OrdersInteractiveList } from './components/OrdersInteractiveList';

export function OrdersPage({ userId }: { userId: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center lg:mb-12">
        <h1 className="font-bold tracking-tight">My Orders</h1>
      </div>
      <OrdersInteractiveList userId={userId} />
    </div>
  );
}

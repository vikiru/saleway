import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type OrderStatus = 'delivered' | 'processing' | 'cancelled' | 'shipped';

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: string;
  itemCount: number;
}

export default function OrdersPage() {
  const orders: Order[] = [
    {
      id: 'WU88191139',
      date: '2023-10-15',
      status: 'delivered',
      total: '$230.00',
      itemCount: 2,
    },
    {
      id: 'WU88191140',
      date: '2023-10-10',
      status: 'shipped',
      total: '$89.99',
      itemCount: 1,
    },
    {
      id: 'WU88191141',
      date: '2023-10-05',
      status: 'processing',
      total: '$156.50',
      itemCount: 3,
    },
    {
      id: 'WU88191142',
      date: '2023-09-28',
      status: 'delivered',
      total: '$67.25',
      itemCount: 1,
    },
  ];

  const statusStyles: Record<OrderStatus, string> = {
    delivered: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    shipped: 'bg-blue-100 text-blue-800',
  };

  const statusLabels: Record<OrderStatus, string> = {
    delivered: 'Delivered',
    processing: 'Processing',
    cancelled: 'Cancelled',
    shipped: 'Shipped',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your orders
          </p>
        </div>

        <div className="divide-y divide-gray-200 overflow-hidden bg-white shadow sm:rounded-lg">
          {orders.map((order) => (
            <Link
              className="block transition-colors duration-150 hover:bg-gray-50"
              href={`/orders/${order.id}`}
              key={order.id}
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <p className="truncate text-sm font-medium text-indigo-600">
                        Order #{order.id}
                      </p>
                      <span
                        className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[order.status]}`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg
                          className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            fillRule="evenodd"
                          />
                        </svg>
                        <time dateTime={order.date}>
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg
                          className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                            fillRule="evenodd"
                          />
                        </svg>
                        {order.itemCount}{' '}
                        {order.itemCount === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex shrink-0 items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {order.total}
                      </p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <ChevronRight
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="rounded-lg bg-white py-12 text-center shadow">
            <svg
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders yet.
            </p>
            <div className="mt-6">
              <Link
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                href="/"
              >
                Continue Shopping
                <ChevronRight
                  aria-hidden="true"
                  className="-mr-1 ml-2 h-4 w-4"
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <Link
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                href="#"
              >
                Previous
              </Link>
              <Link
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                href="#"
              >
                Next
              </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">{orders.length}</span> of{' '}
                  <span className="font-medium">{orders.length}</span> results
                </p>
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                >
                  <Link
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                    href="#"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link
                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    href="#"
                  >
                    1
                  </Link>
                  <Link
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                    href="#"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

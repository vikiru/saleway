import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type OrderStatus = 'delivered' | 'processing' | 'cancelled' | 'shipped';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  status: OrderStatus;
  statusDetail: string;
}

interface Order {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  statusDetail: string;
  total: string;
  subtotal: string;
  shipping: string;
  tax: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  payment: {
    cardType: string;
    cardLastFour: string;
    expDate: string;
  };
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data from an API
  const order: Order = {
    id: params.id,
    number: `#${params.id.padStart(8, '0')}`,
    date: '2023-10-15',
    status: 'delivered',
    statusDetail: 'Delivered on Oct 18, 2023',
    subtotal: '$148.00',
    shipping: '$15.00',
    tax: '$27.60',
    total: '$190.60',
    customer: {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
    },
    shippingAddress: {
      name: 'John Smith',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'United States',
    },
    payment: {
      cardType: 'Visa',
      cardLastFour: '1234',
      expDate: '12/25',
    },
    items: [
      {
        id: '1',
        name: 'Wireless Headphones',
        price: '$99.00',
        quantity: 1,
        image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
        status: 'delivered',
        statusDetail: 'Delivered on Oct 18, 2023',
      },
      {
        id: '2',
        name: 'Leather Wallet',
        price: '$49.00',
        quantity: 1,
        image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-02.jpg',
        status: 'delivered',
        statusDetail: 'Delivered on Oct 18, 2023',
      },
    ],
  };

  const statusStyles: Record<OrderStatus, string> = {
    delivered: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    shipped: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="pb-6">
            <Link
              href="/orders"
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
              Back to orders
            </Link>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Order {order.number}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Placed on{' '}
                <time dateTime={order.date}>
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusStyles[order.status]
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Order status</h2>
            <div className="mt-4">
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full ${statusStyles[order.status].split(' ')[0]}`}></div>
                <p className="ml-3 text-sm font-medium text-gray-900">
                  {order.statusDetail}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Order details</h2>
            <div className="mt-4 bg-gray-50 rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {item.price}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              statusStyles[item.status]
                            }`}
                          >
                            {item.statusDetail}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{order.subtotal}</p>
                </div>
                <div className="mt-1 flex justify-between text-sm text-gray-500">
                  <p>Shipping</p>
                  <p>{order.shipping}</p>
                </div>
                <div className="mt-1 flex justify-between text-sm text-gray-500">
                  <p>Tax</p>
                  <p>{order.tax}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{order.total}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Shipping address</h2>
              <div className="mt-4 text-sm text-gray-500">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900">Payment information</h2>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {order.payment.cardType} ending in {order.payment.cardLastFour}
                </p>
                <p className="mt-1 text-sm text-gray-500">Expires {order.payment.expDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-medium text-gray-900">Customer information</h2>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{order.customer.name}</p>
              <p className="mt-1 text-sm text-gray-500">{order.customer.email}</p>
              <p className="mt-1 text-sm text-gray-500">{order.customer.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

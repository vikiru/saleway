export default function DashboardPage() {
  const stats = [
    {
      name: 'Total Orders',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Total Spent',
      value: '$4,567',
      change: '+8.2%',
      changeType: 'increase',
    },
    {
      name: 'Wishlist Items',
      value: '24',
      change: '+4',
      changeType: 'increase',
    },
    {
      name: 'Active Carts',
      value: '2',
      change: '0%',
      changeType: 'neutral',
    },
  ];

  const recentOrders = [
    {
      id: '1',
      number: 'WU88191139',
      date: 'May 3, 2023',
      datetime: '2023-05-03',
      href: '/',
      total: '$230.00',
      products: [
        {
          id: 1,
          name: 'Wireless Headphones',
          href: '#',
          price: '$99.00',
          status: 'Delivered',
          date: 'May 5, 2023',
          datetime: '2023-05-05',
        },
        {
          id: 2,
          name: 'Leather Wallet',
          href: '#',
          price: '$49.00',
          status: 'Shipped',
          date: 'May 3, 2023',
          datetime: '2023-05-03',
        },
      ],
    },
  ];

  const recentReviews = [
    {
      id: 1,
      title: 'Great product!',
      rating: 5,
      content: 'I really love this product. It exceeded my expectations!',
      author: 'John D.',
      date: 'May 16, 2023',
      datetime: '2023-05-16',
    },
    {
      id: 2,
      title: 'Good quality',
      rating: 4,
      content: 'Good quality product, but delivery took longer than expected.',
      author: 'Sarah M.',
      date: 'May 10, 2023',
      datetime: '2023-05-10',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                className="overflow-hidden rounded-lg bg-white shadow"
                key={stat.name}
              >
                <div className="px-4 py-5 sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {stat.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                  <div
                    className={`mt-1 text-sm ${stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'}`}
                  >
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Orders
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <li className="px-4 py-4 sm:px-6" key={order.id}>
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-indigo-600">
                          Order #{order.number}
                        </p>
                        <div className="ml-2 flex flex-shrink-0">
                          <p className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                            {order.products[0].status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {order.products.length}{' '}
                            {order.products.length === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            <time dateTime={order.datetime}>{order.date}</time>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    href="/orders"
                  >
                    View all orders
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Reviews
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {recentReviews.map((review) => (
                    <li className="px-4 py-4 sm:px-6" key={review.id}>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <svg
                              className={`h-5 w-5 ${rating < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              key={rating}
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="ml-3 text-sm font-medium text-gray-900">
                          {review.title}
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{review.content}</p>
                      </div>
                      <div className="mt-2 text-sm">
                        <p className="text-gray-500">
                          Reviewed by{' '}
                          <span className="text-gray-900">{review.author}</span>{' '}
                          on{' '}
                          <time dateTime={review.datetime}>{review.date}</time>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Account Information
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      John Doe
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      johndoe@example.com
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      (123) 456-7890
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      1234 Main St
                      <br />
                      Anytown, CA 12345
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    href="/account"
                  >
                    Manage account
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

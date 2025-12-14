import { ChevronRight, Clock, Shield, ShoppingBag, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Minimalist Wireless Headphones',
    price: 199.99,
    image: '/placeholder-headphones.jpg',
  },
  {
    id: 2,
    name: 'Sleek Smart Watch',
    price: 249.99,
    image: '/placeholder-watch.jpg',
  },
  {
    id: 3,
    name: 'Classic Sneakers',
    price: 89.99,
    image: '/placeholder-shoes.jpg',
  },
  {
    id: 4,
    name: 'Pour Over Coffee Set',
    price: 129.99,
    image: '/placeholder-coffee.jpg',
  },
];

const collections = [
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Best Sellers', href: '/best-sellers' },
  { name: 'Sale', href: '/sale' },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
              Timeless Design,
              <br />
              <span className="font-medium">Modern Simplicity</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover essential pieces designed for everyday life. Crafted with
              care, built to last.
            </p>
            <Link
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
              href="/shop"
            >
              Shop Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                className="group relative overflow-hidden bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors"
                href={collection.href}
                key={collection.name}
              >
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  {collection.name}
                </h2>
                <p className="text-sm text-gray-500 flex items-center">
                  Shop now <ChevronRight className="ml-1 h-4 w-4" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free delivery on all orders over $50
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated customer support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">
              Featured Products
            </h2>
            <Link
              className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center"
              href="/shop"
            >
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div className="group relative" key={product.id}>
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <Image
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity"
                    height={400}
                    src={product.image}
                    width={400}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <div className="mt-1 flex justify-between">
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      aria-label="Add to cart"
                      className="text-gray-400 hover:text-gray-500"
                      type="button"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Sign up for our newsletter and receive 10% off your first order.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              aria-label="Email address"
              className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-black focus:border-black"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default function ProductDetails() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <a className="text-gray-400 hover:text-gray-500" href="#">
                    <span className="sr-only">Home</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 h-5 w-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <a
                    className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    href="#"
                  >
                    Products
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 h-5 w-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    Product Name
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="lg:col-start-2 lg:mt-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Product Name
              </h1>
              <div className="mt-4">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">$192.00</p>
                <div className="mt-4 flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        key={rating}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">24 reviews</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base text-gray-700">
                  <p>
                    Product description goes here. This is a detailed
                    description of the product features and benefits.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">
                    In stock and ready to ship
                  </span>
                </div>
              </div>

              <form className="mt-6">
                <div className="mt-6">
                  <button
                    className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit"
                  >
                    Add to cart
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-12 lg:mt-0 lg:col-start-1 lg:row-start-1 lg:self-start">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                <img
                  alt="Product image"
                  className="w-full h-full object-center object-cover"
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg"
                    key={i}
                  >
                    <img
                      alt="Product thumbnail"
                      className="w-full h-full object-center object-cover"
                      src={`https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-0${i}.jpg`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-lg font-medium text-gray-900">
              Product details
            </h2>
            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-base text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

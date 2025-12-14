export default function SearchPage() {
  const filters = {
    price: [
      { value: '0-25', label: 'Under $25' },
      { value: '25-50', label: '$25 - $50' },
      { value: '50-100', label: '$50 - $100' },
      { value: '100-200', label: '$100 - $200' },
      { value: '200+', label: '$200 & Above' },
    ],
    color: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'red', label: 'Red' },
      { value: 'blue', label: 'Blue' },
      { value: 'green', label: 'Green' },
    ],
    size: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
    ],
    category: [
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'home', label: 'Home & Living' },
    ],
  };

  const products = Array(12)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      name: 'Product ' + (i + 1),
      price: 99.99 - i * 5,
      rating: 4.5 - (i % 5) * 0.1,
      reviewCount: 100 + i * 3,
      image: `https://tailwindui.com/img/ecommerce-images/product-page-0${(i % 5) + 1}-related-product-0${(i % 3) + 1}.jpg`,
    }));

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            New Arrivals
          </h1>
          <div
            className="flex items-center
          "
          >
            <div className="relative inline-block text-left">
              <div className="group inline-flex justify-between text-sm font-medium text-gray-700 hover:text-gray-900">
                <span>Sort</span>
                <svg
                  className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <button
              className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
              type="button"
            >
              <span className="sr-only">Filters</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>

              {Object.entries(filters).map(([sectionName, sectionItems]) => (
                <div
                  className="border-b border-gray-200 py-6"
                  key={sectionName}
                >
                  <h3 className="-my-3 flow-root">
                    <div className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900 capitalize">
                        {sectionName}
                      </span>
                    </div>
                  </h3>
                  <div className="pt-6">
                    <div className="space-y-4">
                      {sectionItems.map((option) => (
                        <div className="flex items-center" key={option.value}>
                          <input
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            defaultValue={option.value}
                            id={`filter-${sectionName}-${option.value}`}
                            name={`${sectionName}[]`}
                            type="checkbox"
                          />
                          <label
                            className="ml-3 text-sm text-gray-600"
                            htmlFor={`filter-${sectionName}-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </form>

            <div className="lg:col-span-3">
              <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                      <a
                        className="group"
                        href={`/products/${product.id}`}
                        key={product.id}
                      >
                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                          <img
                            alt={product.name}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                            src={product.image}
                          />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <svg
                              className={`h-5 w-5 ${rating < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                              fill="currentColor"
                              key={rating}
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {product.reviewCount} reviews
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

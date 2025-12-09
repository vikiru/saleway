export default function CartPage() {
	const cartItems = [
		{
			id: 1,
			name: "Wireless Headphones",
			price: 99.99,
			quantity: 1,
			image: "",
		},
		{
			id: 2,
			name: "Leather Wallet",
			price: 49.99,
			quantity: 1,
			image: "",
		},
	];

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const tax = subtotal * 0.1; // 10% tax
	const shipping = 15.0;
	const total = subtotal + tax + shipping;

	return (
		<div className="bg-white">
			<div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
					Shopping Cart
				</h1>

				<div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
					<section aria-labelledby="cart-heading" className="lg:col-span-7">
						<h2 className="sr-only" id="cart-heading">
							Items in your shopping cart
						</h2>

						<ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
							{cartItems.map((item) => (
								<li className="flex py-6 sm:py-10" key={item.id}>
									<div className="flex-shrink-0">
										<img
											alt={item.name}
											className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
											src={item.image}
										/>
									</div>

									<div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
										<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
											<div>
												<div className="flex justify-between">
													<h3 className="text-sm">
														<a
															className="font-medium text-gray-700 hover:text-gray-800"
															href={`/products/${item.id}`}
														>
															{item.name}
														</a>
													</h3>
												</div>
												<p className="mt-1 text-sm font-medium text-gray-900">
													${item.price.toFixed(2)}
												</p>
											</div>

											<div className="mt-4 sm:mt-0 sm:pr-9">
												<label
													className="sr-only"
													htmlFor={`quantity-${item.id}`}
												>
													Quantity, {item.name}
												</label>
												<select
													className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													defaultValue={item.quantity}
													id={`quantity-${item.id}`}
													name={`quantity-${item.id}`}
												>
													{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
														<option key={num} value={num}>
															{num}
														</option>
													))}
												</select>

												<div className="absolute top-0 right-0">
													<button
														className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
														type="button"
													>
														<span className="sr-only">Remove</span>
														<svg
															aria-hidden="true"
															className="h-5 w-5"
															fill="currentColor"
															viewBox="0 0 20 20"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																clipRule="evenodd"
																d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
																fillRule="evenodd"
															/>
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</section>

					<section
						aria-labelledby="summary-heading"
						className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
					>
						<h2
							className="text-lg font-medium text-gray-900"
							id="summary-heading"
						>
							Order summary
						</h2>

						<dl className="mt-6 space-y-4">
							<div className="flex items-center justify-between">
								<dt className="text-sm text-gray-600">Subtotal</dt>
								<dd className="text-sm font-medium text-gray-900">
									${subtotal.toFixed(2)}
								</dd>
							</div>
							<div className="border-t border-gray-200 pt-4 flex items-center justify-between">
								<dt className="flex items-center text-sm text-gray-600">
									<span>Shipping estimate</span>
								</dt>
								<dd className="text-sm font-medium text-gray-900">
									${shipping.toFixed(2)}
								</dd>
							</div>
							<div className="border-t border-gray-200 pt-4 flex items-center justify-between">
								<dt className="flex text-sm text-gray-600">
									<span>Tax estimate</span>
								</dt>
								<dd className="text-sm font-medium text-gray-900">
									${tax.toFixed(2)}
								</dd>
							</div>
							<div className="border-t border-gray-200 pt-4 flex items-center justify-between">
								<dt className="text-base font-medium text-gray-900">
									Order total
								</dt>
								<dd className="text-base font-medium text-gray-900">
									${total.toFixed(2)}
								</dd>
							</div>
						</dl>

						<div className="mt-6">
							<button
								className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
								type="submit"
							>
								Checkout
							</button>
						</div>

						<div className="mt-6 text-center text-sm">
							<p>
								or{" "}
								<a
									className="font-medium text-indigo-600 hover:text-indigo-500"
									href="/products"
								>
									Continue Shopping<span aria-hidden="true"> &rarr;</span>
								</a>
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

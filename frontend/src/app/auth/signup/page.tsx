import Link from "next/link";

export default function SignupPage() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Create your account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Or{" "}
					<Link
						className="font-medium text-indigo-600 hover:text-indigo-500"
						href="/login"
					>
						sign in to your existing account
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6">
						<div>
							<label
								className="block text-sm font-medium text-gray-700"
								htmlFor="name"
							>
								Full name
							</label>
							<div className="mt-1">
								<input
									autoComplete="name"
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									id="name"
									name="name"
									required
									type="text"
								/>
							</div>
						</div>

						<div>
							<label
								className="block text-sm font-medium text-gray-700"
								htmlFor="email"
							>
								Email address
							</label>
							<div className="mt-1">
								<input
									autoComplete="email"
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									id="email"
									name="email"
									required
									type="email"
								/>
							</div>
						</div>

						<div>
							<label
								className="block text-sm font-medium text-gray-700"
								htmlFor="password"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									autoComplete="new-password"
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									id="password"
									name="password"
									required
									type="password"
								/>
							</div>
						</div>

						<div>
							<label
								className="block text-sm font-medium text-gray-700"
								htmlFor="confirm-password"
							>
								Confirm password
							</label>
							<div className="mt-1">
								<input
									autoComplete="new-password"
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									id="confirm-password"
									name="confirm-password"
									required
									type="password"
								/>
							</div>
						</div>

						<div className="flex items-center">
							<input
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								id="terms"
								name="terms"
								required
								type="checkbox"
							/>
							<label
								className="ml-2 block text-sm text-gray-900"
								htmlFor="terms"
							>
								I agree to the{" "}
								<a
									className="text-indigo-600 hover:text-indigo-500"
									href="/terms"
								>
									Terms of Service
								</a>{" "}
								and{" "}
								<a
									className="text-indigo-600 hover:text-indigo-500"
									href="/privacy"
								>
									Privacy Policy
								</a>
							</label>
						</div>

						<div>
							<button
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								type="submit"
							>
								Create account
							</button>
						</div>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<div>
								<a
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									href="/api/auth/google"
								>
									<span className="sr-only">Sign in with Google</span>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
									</svg>
								</a>
							</div>

							<div>
								<a
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									href="/api/auth/github"
								>
									<span className="sr-only">Sign in with GitHub</span>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											clipRule="evenodd"
											d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.17 20 14.444 20 10.017 20 4.484 15.522 0 10 0z"
											fillRule="evenodd"
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

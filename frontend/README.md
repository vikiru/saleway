# Saleway Frontend

Storefront web application for the Saleway platform built with [Next.js](https://nextjs.org/) and [React](https://react.dev/).

## Features

- Product browsing by category and brand
- Product search with [FlexSearch](https://github.com/nextapps-de/flexsearch)
- Shopping cart with state management via [Zustand](https://github.com/pmndrs/zustand)
- Stripe Checkout integration for payment processing
- Order history and status tracking
- User authentication and route protection via [Clerk](https://clerk.com/)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (Turbopack), [React](https://react.dev/) 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/) v4, [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/)
- **State & Data Fetching**: [Zustand](https://github.com/pmndrs/zustand), [TanStack Query](https://tanstack.com/query)
- **Search**: [FlexSearch](https://github.com/nextapps-de/flexsearch)
- **Authentication**: [Clerk](https://clerk.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linter & Formatter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables:

```bash
cp .env.sample .env
```

3. Set up the required Clerk and Google Gemini credentials:

   - Create a [Clerk account](https://clerk.com/) and application to obtain the required API keys.
   - Create a project in [Google AI Studio](https://aistudio.google.com/) and obtain a Gemini API key.

4. Prebuild product search index and catalog data:

```bash
pnpm prebuild
```

5. Start development server:

```bash
pnpm dev
```

## Environment Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_ISSUER_URL=https://clerk.your-tenant.com
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding

# Internal Microservice URLs
CART_SERVICE_URL=http://localhost:8080/api/v1
ORDER_SERVICE_URL=http://localhost:5000/api/v1
PAYMENT_SERVICE_URL=http://localhost:8081/api/v1
PRODUCT_SERVICE_URL=http://localhost:8000/api/v1
RATING_SERVICE_URL=http://localhost:8001/api/v1
USER_SERVICE_URL=http://localhost:8002/api/v1

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key
```

The application runs on port `3000` by default.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm prebuild` - Fetch product data and generate search index
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Lint files with Oxlint
- `pnpm format` - Format files with Oxfmt
- `pnpm typecheck` - Run TypeScript type checks
- `pnpm analyze` - Build and generate Next.js bundle analyzer report
- `pnpm unused` - Check unused dependencies with Knip

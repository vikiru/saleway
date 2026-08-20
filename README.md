<h1 align="center">Saleway <br> Microservices Based E-commerce Platform </h1>

<div align="center" id="badges">
  <a href="https://github.com/vikiru/saleway/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-aqua" alt="MIT License Badge"/>
  </a>
  <a href="https://github.com/vikiru/saleway/releases">
    <img src="https://img.shields.io/github/v/release/vikiru/saleway" alt="Release"/>
  </a>
  <a href="https://github.com/vikiru/saleway/issues?q=is%3Aissue+is%3Aclosed">
    <img src="https://img.shields.io/github/issues-closed/vikiru/saleway" alt="Closed Issues"/>
  </a>
  <a href="https://github.com/vikiru/saleway/pulls?q=is%3Apr+is%3Aclosed">
    <img src="https://img.shields.io/github/issues-pr-closed/vikiru/saleway?label=closed%20prs" alt="Closed PRs"/>
  </a>
</div>

---

**Saleway** is a full-stack e-commerce platform powered by a polyglot microservices architecture. It pairs a modern Next.js storefront with specialized backend services for cart management, order workflows, Stripe payments, product discovery, customer reviews, and user accounts.

Each service operates as an independent, containerized domain with its own PostgreSQL database and dedicated technology stack, leveraging **Node.js / Express** with Prisma for real-time cart state, **Python / FastAPI** for AI-enriched product catalogs, **Flask** for order processing, **Django / Django Ninja** for user profiles and product ratings, and **Java / Spring Boot** for Stripe checkout orchestration.

All services expose standardized health probes (`/api/v1/health`), include Bruno API collections for endpoint verification, and provide deployment configurations for both **Docker Compose** and local **Kubernetes** clusters (`infra/k8s/`).

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [🌟 Features](#-features)
- [🏗️ Microservice Architecture](#️-microservice-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📝 Prerequisites](#-prerequisites)
- [⚡ Setup Instructions](#-setup-instructions)
  - [1. Root Environment Configuration](#1-root-environment-configuration)
  - [2. Service Environment Configuration](#2-service-environment-configuration)
    - [A. Frontend (`frontend/.env`)](#a-frontend-frontendenv)
    - [B. Cart Service (`services/cart/.env`)](#b-cart-service-servicescartenv)
    - [C. Order Service (`services/order/.env`)](#c-order-service-servicesorderenv)
    - [D. Payment Service (`services/payment/src/main/resources/application.properties`)](#d-payment-service-servicespaymentsrcmainresourcesapplicationproperties)
    - [E. Product Service (`services/product/.env`)](#e-product-service-servicesproductenv)
    - [F. Rating Service (`services/rating/.env`)](#f-rating-service-servicesratingenv)
    - [G. User Service (`services/user/.env`)](#g-user-service-servicesuserenv)
  - [3. Option A: Docker Compose Deployment (Recommended)](#3-option-a-docker-compose-deployment-recommended)
  - [4. Option B: Local Kubernetes Deployment](#4-option-b-local-kubernetes-deployment)
  - [5. Option C: Local Microservice Development](#5-option-c-local-microservice-development)
- [📜 Available Scripts](#-available-scripts)
- [✨ Acknowledgments](#-acknowledgments)
- [©️ License](#️-license)

## 🌟 Features

- **Product Catalog and Browsing**: Browse products by category or brand, with product details and metadata generated using Gemini AI - refer to [Product Service](./services/product).
- **Product Search and Filtering**: Search for products by name and filter by category or brand with [FlexSearch](https://github.com/nextapps-de/flexsearch).
- **Shopping Cart**: Add, update item quantities, and remove items with persistent syncing between local [Zustand](https://github.com/pmndrs/zustand) state and the backend [Cart Service](./services/cart).
- **Checkout and Payment Processing**: Process payments securely through Stripe Checkout sessions, with payment verification and refund support - refer to [Payment Service](./services/payment).
- **Order Tracking and History**: View past orders, order status, and itemized summaries linked to completed checkout sessions - refer to [Order Service](./services/order).
- **Ratings and Reviews**: Submit product reviews and ratings, with average ratings calculated dynamically - refer to [Rating Service](./services/rating).
- **User Authentication**: User authentication and profile management powered by [Clerk](https://clerk.com/) - refer to [User Service](./services/user).
- **Containerized Microservices**: Run all services locally using Docker Compose or deploy to a local Kubernetes cluster using the provided manifests (`infra/k8s/`).
- **API Testing Suites**: Runnable [Bruno](https://www.usebruno.com/) API collections for endpoint verification across each microservice.

## 🏗️ Microservice Architecture

| Service     | Directory                              | Stack                                  | Port   | Database     | Health Check         |
| :---------- | :------------------------------------- | :------------------------------------- | :----- | :----------- | :------------------- |
| **Cart**    | [services/cart](./services/cart)       | Node.js, Express, Prisma               | `8080` | `cart_db`    | `GET /api/v1/health` |
| **Order**   | [services/order](./services/order)     | Python, Flask, SQLAlchemy, Marshmallow | `5000` | `order_db`   | `GET /api/v1/health` |
| **Payment** | [services/payment](./services/payment) | Java 17+, Spring Boot, Stripe SDK      | `8081` | `payment_db` | `GET /api/v1/health` |
| **Product** | [services/product](./services/product) | Python, FastAPI, SQLAlchemy, Gemini AI | `8000` | `product_db` | `GET /api/v1/health` |
| **Rating**  | [services/rating](./services/rating)   | Python, Django, Django Ninja           | `8001` | `rating_db`  | `GET /api/v1/health` |
| **User**    | [services/user](./services/user)       | Python, Django, Django Ninja           | `8002` | `user_db`    | `GET /api/v1/health` |

## 🛠️ Tech Stack

- **Frontend**: [TypeScript](https://www.typescriptlang.org/), [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Zustand](https://github.com/pmndrs/zustand), [TanStack Query](https://tanstack.com/query), [FlexSearch](https://github.com/nextapps-de/flexsearch), [Recharts](https://recharts.org/), [Lucide](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/).
- **Microservices & Frameworks**:
  - **Node.js**: [Express](https://expressjs.com/), [Prisma](https://www.prisma.io/).
  - **Python**: [FastAPI](https://fastapi.tiangolo.com/), [Flask](https://flask.palletsprojects.com/), [Django](https://www.djangoproject.com/), [Django Ninja](https://django-ninja.dev/), [SQLAlchemy](https://www.sqlalchemy.org/), [Marshmallow](https://marshmallow.readthedocs.io/), [Pydantic](https://docs.pydantic.dev/).
  - **Java**: [Spring Boot](https://spring.io/projects/spring-boot), [Maven](https://maven.apache.org/).
- **Databases & Persistence**: [PostgreSQL 16](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/), [SQLAlchemy](https://www.sqlalchemy.org/), [Alembic](https://alembic.sqlalchemy.org/).
- **Payments & Authentication**: [Stripe](https://stripe.com/), [Stripe Java SDK](https://github.com/stripe/stripe-java), [Clerk](https://clerk.com/).
- **AI & Integrations**: [Google GenAI SDK (Gemini)](https://ai.google.dev/gemini-api/docs).
- **Containerization & Orchestration**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/), [Kubernetes](https://kubernetes.io/), [Minikube](https://minikube.sigs.k8s.io/), [Kind](https://kind.sigs.k8s.io/).
- **API Testing**: [Bruno](https://www.usebruno.com/).
- **AI Tools**: [Google AI Studio](https://aistudio.google.com/), Spec-driven development using [OpenSpec](https://openspec.dev/).
- **Dev Tools & Linting**: [pnpm](https://pnpm.io/), [uv](https://docs.astral.sh/uv/), [poethepoet](https://github.com/nat-n/poethepoet), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), [Ruff](https://docs.astral.sh/ruff/), [Checkstyle](https://checkstyle.sourceforge.io/), [Google Java Format](https://github.com/google/google-java-format), [Knip](https://github.com/webpro-nl/knip), [Lefthook](https://github.com/evilmartians/lefthook), [commitlint](https://commitlint.js.org/), [semantic-release](https://github.com/semantic-release/semantic-release).

## 📝 Prerequisites

Ensure that the following prerequisites are installed on your system by following the [Setup Instructions](#-setup-instructions):

- [Node.js](https://nodejs.org/) `>= 22.12`
- [pnpm](https://pnpm.io/) `>= 11`
- [Python](https://www.python.org/) `>= 3.12`
- [uv](https://docs.astral.sh/uv/)
- [Java Development Kit (JDK)](https://adoptium.net/) `>= 17`
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) and [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- Stripe Account (via [Stripe Dashboard](https://dashboard.stripe.com/))
- Google Gemini API Key (via [Google AI Studio](https://aistudio.google.com/))
- Clerk Application Credentials (via [Clerk Dashboard](https://clerk.com/))

## ⚡ Setup Instructions

### 1. Root Environment Configuration

1. Clone this repository to your local machine:

```bash
git clone https://github.com/vikiru/saleway.git
cd saleway
```

2. Install root dependencies and Git hooks:

```bash
pnpm install
```

3. Create your root `.env` file from the sample template:

```bash
cp .env.sample .env
```

4. Set up the required external service credentials:

   - Create a [Clerk account](https://clerk.com/) and application to obtain your Clerk publishable key, secret key, and issuer URL.
   - Create a project in [Google AI Studio](https://aistudio.google.com/) and obtain a Gemini API key.
   - Create a [Stripe account](https://stripe.com/) to obtain your Stripe secret and publishable keys.

5. Populate `.env` with your global credentials:

```bash
# PostgreSQL Admin & Service Passwords
POSTGRES_ADMIN_PASSWORD=your_secure_admin_password
CART_DB_PASSWORD=your_cart_password
ORDER_DB_PASSWORD=your_order_password
PRODUCT_DB_PASSWORD=your_product_password
RATING_DB_PASSWORD=your_rating_password
USER_DB_PASSWORD=your_user_password

# Stripe (Payment Service)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Internal Service URLs
CART_SERVICE_URL=http://localhost:8080/api/v1
ORDER_SERVICE_URL=http://localhost:5000/api/v1
PAYMENT_SERVICE_URL=http://localhost:8081/api/v1
PRODUCT_SERVICE_URL=http://localhost:8000/api/v1
RATING_SERVICE_URL=http://localhost:8001/api/v1
USER_SERVICE_URL=http://localhost:8002/api/v1

# Frontend CORS
FRONTEND_URL=http://localhost:3000

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_ISSUER_URL=https://clerk.your-tenant.com
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
```

---

### 2. Service Environment Configuration

For local development without Docker Compose, each service maintains its own isolated environment configuration:

#### A. Frontend (`frontend/.env`)

Copy `frontend/.env.sample` to `frontend/.env`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_ISSUER_URL=https://clerk.your-tenant.com
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding

CART_SERVICE_URL=http://localhost:8080/api/v1
ORDER_SERVICE_URL=http://localhost:5000/api/v1
PAYMENT_SERVICE_URL=http://localhost:8081/api/v1
PRODUCT_SERVICE_URL=http://localhost:8000/api/v1
RATING_SERVICE_URL=http://localhost:8001/api/v1
USER_SERVICE_URL=http://localhost:8002/api/v1
GEMINI_API_KEY=your_gemini_api_key
```

#### B. Cart Service (`services/cart/.env`)

Copy `services/cart/.env.sample` to `services/cart/.env`:

```bash
NODE_ENV=development
PORT=8080
DATABASE_URL=postgresql://cart_user:your_cart_password@localhost:5432/cart_db
FRONTEND_URL=http://localhost:3000
CLERK_SECRET_KEY=sk_test_...
```

#### C. Order Service (`services/order/.env`)

Copy `services/order/.env.sample` to `services/order/.env`:

```bash
DATABASE_URL=postgresql://order_user:your_order_password@localhost:5432/order_db
FRONTEND_URL=http://localhost:3000
CLERK_ISSUER_URL=https://clerk.your-tenant.com
```

#### D. Payment Service (`services/payment/src/main/resources/application.properties`)

Copy `application-sample.properties` to `application.properties`:

```properties
stripe.api.key=sk_test_your_stripe_secret_key
stripe.test.mode=true
cors.allowed.origins=http://localhost:3000
spring.datasource.url=jdbc:postgresql://localhost:5432/payment_db
spring.datasource.username=payment_user
spring.datasource.password=your_payment_password
```

#### E. Product Service (`services/product/.env`)

Copy `services/product/.env.sample` to `services/product/.env`:

```bash
DATABASE_URL=postgresql://product_user:your_product_password@localhost:5432/product_db
GEMINI_API_KEY=your_gemini_api_key
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000
```

#### F. Rating Service (`services/rating/.env`)

Copy `services/rating/.env.sample` to `services/rating/.env`:

```bash
DATABASE_URL=postgresql://rating_user:your_rating_password@localhost:5432/rating_db
CORS_ALLOWED_ORIGINS=http://localhost:3000
CLERK_ISSUER_URL=https://clerk.your-tenant.com
```

#### G. User Service (`services/user/.env`)

Copy `services/user/.env.sample` to `services/user/.env`:

```bash
DATABASE_URL=postgresql://user_service:your_user_password@localhost:5432/user_db
FRONTEND_URL=http://localhost:3000
```

---

### 3. Option A: Docker Compose Deployment (Recommended)

Start the unified PostgreSQL instance and all six microservices in containers using the root `.env`:

1. Launch all services using Docker Compose:

```bash
docker compose up --build -d
```

2. Verify all container health checks:

```bash
docker compose ps
```

3. Prebuild frontend product cache and start the Next.js storefront:

```bash
pnpm --filter saleway-frontend prebuild
pnpm --filter saleway-frontend dev
```

The application storefront will be accessible at:

```text
http://localhost:3000
```

---

### 4. Option B: Local Kubernetes Deployment

Deploy the full microservices topology to a local Minikube or Kind cluster:

1. Execute the automated local Kubernetes deployment script:

```bash
./deploy-local-k8s.sh
```

2. Monitor pod deployment status:

```bash
kubectl get pods -n saleway -w
```

3. Access services via ingress or port-forwarding as configured in [`infra/k8s/`](./infra/k8s).

---

### 5. Option C: Local Microservice Development

To run microservices locally without full containerization:

1. **Start PostgreSQL Database**:

   ```bash
   docker compose up postgres -d
   ```

2. **Cart Service (Node.js)**:

   ```bash
   cd services/cart
   cp .env.sample .env
   pnpm install
   npx prisma migrate dev
   pnpm dev
   ```

3. **Product Service (FastAPI)**:

   ```bash
   cd services/product
   cp .env.sample .env
   uv sync
   uv run poe migrate
   uv run poe seed
   uv run poe dev
   ```

4. **Order Service (Flask)**:

   ```bash
   cd services/order
   cp .env.sample .env
   uv sync
   uv run poe migrate
   uv run poe dev
   ```

5. **Payment Service (Spring Boot)**:

   ```bash
   cd services/payment
   cp src/main/resources/application-sample.properties src/main/resources/application.properties
   ./mvnw clean compile
   ./mvnw spring-boot:run
   ```

6. **Rating Service (Django)**:

   ```bash
   cd services/rating
   cp .env.sample .env
   uv sync
   uv run poe migrate
   uv run poe dev
   ```

7. **User Service (Django)**:

   ```bash
   cd services/user
   cp .env.sample .env
   uv sync
   uv run poe migrate
   uv run poe dev
   ```

8. **Frontend**:
   ```bash
   cd frontend
   cp .env.sample .env
   pnpm install
   pnpm prebuild
   pnpm dev
   ```

## 📜 Available Scripts

1. Lint TypeScript and frontend files using [Oxlint](https://oxc.rs/docs/guide/usage/linter.html).

```bash
pnpm lint:oxlint
```

2. Format TypeScript and frontend files using [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html).

```bash
pnpm format:oxfmt
```

3. Lint Python services using [Ruff](https://docs.astral.sh/ruff/).

```bash
pnpm lint:python
```

4. Format Python services using [Ruff](https://docs.astral.sh/ruff/).

```bash
pnpm format:python
```

5. Lint Java payment service code with [Checkstyle](https://checkstyle.sourceforge.io/).

```bash
pnpm lint:java
```

6. Format Java payment service code with [Google Java Format](https://github.com/google/google-java-format).

```bash
pnpm format:java
```

7. Run Bruno API test collections across individual services (requires services running locally on `localhost`):

```bash
pnpm bruno:product
pnpm bruno:order
pnpm bruno:user
pnpm bruno:rating
pnpm bruno:payment
pnpm bruno:cart
```

8. Check for unused dependencies and exports across the workspace with [Knip](https://github.com/webpro-nl/knip).

```bash
pnpm unused
```

9. Prepare Git hooks with [Lefthook](https://github.com/evilmartians/lefthook).

```bash
pnpm postinstall
```

## ✨ Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TanStack Query](https://tanstack.com/query)
- [FlexSearch](https://github.com/nextapps-de/flexsearch)
- [Lucide Icons](https://lucide.dev/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Recharts](https://recharts.org/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Flask](https://flask.palletsprojects.com/)
- [Django](https://www.djangoproject.com/)
- [Django Ninja](https://django-ninja.dev/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Marshmallow](https://marshmallow.readthedocs.io/)
- [Pydantic](https://docs.pydantic.dev/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Checkstyle](https://checkstyle.sourceforge.io/)
- [Google Java Format](https://github.com/google/google-java-format)
- [Stripe](https://stripe.com/)
- [Stripe Java SDK](https://github.com/stripe/stripe-java)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)
- [Google AI Studio](https://aistudio.google.com/)
- [OpenSpec](https://openspec.dev/)
- [Unsplash](https://unsplash.com/)
- [Clerk](https://clerk.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Bruno](https://www.usebruno.com/)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)
- [Ruff](https://docs.astral.sh/ruff/)
- [uv](https://docs.astral.sh/uv/)
- [Poe the Poet](https://github.com/nat-n/poethepoet)
- [Knip](https://github.com/webpro-nl/knip)
- [Lefthook](https://github.com/evilmartians/lefthook)
- [Shields Badges](https://github.com/badges/shields)
- [Semantic Release](https://github.com/semantic-release/semantic-release)

Additionally, all external images used within this application are sourced from [Unsplash](https://unsplash.com/) and belong to their respective owners.

## ©️ License

The contents of this repository are licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

[MIT](LICENSE) &copy; 2026-present Visakan Kirubakaran.

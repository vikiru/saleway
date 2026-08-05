#!/bin/bash
set -e

echo "=========================================="
echo " Starting Local Kubernetes Deployment"
echo "=========================================="

# Check if Minikube is running and point local docker daemon to Minikube's docker daemon
if command -v minikube >/dev/null 2>&1; then
  echo "=> Pointing Docker to Minikube's internal registry..."
  eval $(minikube -p minikube docker-env)
else
  echo "=> Minikube not found. Assuming you are using Kind or Docker Desktop K8s."
  echo "=> Note: If you are using Kind, you may need to manually load images via 'kind load docker-image <name>'"
fi

echo ""
echo "=> 1. Building Frontend with K8s environment variables..."

# Load Clerk Key from .env if it exists
CLERK_KEY="pk_test_YOUR_CLERK_PUBLISHABLE_KEY"
if [ -f .env ]; then
  echo "   Loading environment variables from .env..."
  # Safely extract just the clerk key to avoid bash syntax errors from complex .env files
  ENV_KEY=$(grep '^NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=' .env | cut -d '=' -f2-)
  if [ ! -z "$ENV_KEY" ]; then
    CLERK_KEY=$ENV_KEY
  fi
fi

# Pass the required Clerk/App URL arguments so Next.js bakes them into the static bundle
docker build \
  --build-arg NEXT_PUBLIC_APP_URL=http://saleway.local \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="${CLERK_KEY}" \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard \
  --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding \
  -t saleway-frontend:latest \
  ./frontend

echo ""
echo "=> 2. Building Backend Microservices..."
docker build -t saleway-cart:latest ./services/cart
docker build -t saleway-order:latest ./services/order
docker build -t saleway-payment:latest ./services/payment
docker build -t saleway-product:latest ./services/product
docker build -t saleway-rating:latest ./services/rating
docker build -t saleway-user:latest ./services/user

echo ""
echo "=> 3. Applying Kubernetes Manifests..."
# Base configs and secrets
kubectl apply -f infra/k8s/base/namespace.yaml
kubectl apply -f infra/k8s/base/configmap.yaml
if [ -f ".env" ]; then
  echo "   Generating secrets.yaml using real values from .env..."
  
  # Safely extract env values without sourcing .env directly
  get_env_val() {
    grep "^${1}=" .env 2>/dev/null | cut -d '=' -f2- | tr -d '\r"'
  }

  POSTGRES_ADMIN_PASS=$(get_env_val "POSTGRES_ADMIN_PASSWORD")
  CART_DB_PASS=$(get_env_val "CART_DB_PASSWORD")
  ORDER_DB_PASS=$(get_env_val "ORDER_DB_PASSWORD")
  PRODUCT_DB_PASS=$(get_env_val "PRODUCT_DB_PASSWORD")
  RATING_DB_PASS=$(get_env_val "RATING_DB_PASSWORD")
  USER_DB_PASS=$(get_env_val "USER_DB_PASSWORD")
  CLERK_SECRET=$(get_env_val "CLERK_SECRET_KEY")
  STRIPE_SECRET=$(get_env_val "STRIPE_SECRET_KEY")
  STRIPE_WEBHOOK=$(get_env_val "STRIPE_WEBHOOK_SECRET")
  STRIPE_PUB=$(get_env_val "STRIPE_PUBLISHABLE_KEY")

  # Helper to encode without trailing newlines
  b64() { echo -n "$1" | base64 | tr -d '\n'; }

  cat <<EOF > infra/k8s/base/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: saleway-secrets
  namespace: ecommerce
type: Opaque
data:
  POSTGRES_ADMIN_PASSWORD: "$(b64 "$POSTGRES_ADMIN_PASS")"
  CART_DB_PASSWORD: "$(b64 "$CART_DB_PASS")"
  ORDER_DB_PASSWORD: "$(b64 "$ORDER_DB_PASS")"
  PRODUCT_DB_PASSWORD: "$(b64 "$PRODUCT_DB_PASS")"
  RATING_DB_PASSWORD: "$(b64 "$RATING_DB_PASS")"
  USER_DB_PASSWORD: "$(b64 "$USER_DB_PASS")"
  CLERK_SECRET_KEY: "$(b64 "$CLERK_SECRET")"
  STRIPE_SECRET_KEY: "$(b64 "$STRIPE_SECRET")"
  STRIPE_WEBHOOK_SECRET: "$(b64 "$STRIPE_WEBHOOK")"
  STRIPE_PUBLISHABLE_KEY: "$(b64 "$STRIPE_PUB")"
EOF
else
  if [ ! -f "infra/k8s/base/secrets.yaml" ]; then
    echo "   No .env and no secrets.yaml found. Generating dummy secrets.yaml..."
    cp infra/k8s/base/secrets.example.yaml infra/k8s/base/secrets.yaml
  fi
fi

echo "   Applying secrets.yaml..."
kubectl apply -f infra/k8s/base/secrets.yaml

# Database
kubectl apply -f infra/k8s/db/postgres-init-configmap.yaml
kubectl apply -f infra/k8s/db/postgres-statefulset.yaml

# Apps
kubectl apply -f infra/k8s/apps/

# Networking
kubectl apply -f infra/k8s/base/network-policies.yaml
kubectl apply -f infra/k8s/base/ingress.yaml

echo ""
echo "=========================================="
echo " Deployment Triggered Successfully!"
echo " Run 'kubectl get pods -n ecommerce -w' to watch the startup process."
echo "=========================================="

# Multi-stage production build for Cart Service
FROM node:22-slim AS base

# Install pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install OpenSSL for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -s /bin/sh appuser

WORKDIR /app

# Dependencies stage
FROM base AS deps

# Copy prisma schema first for layer caching
COPY prisma/schema.prisma ./prisma/
COPY pnpm-lock.yaml package.json ./

# Install all dependencies (including devDependencies for tsx)
RUN pnpm fetch
RUN pnpm install

# Generate Prisma client
RUN pnpm prisma generate

# Production stage
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy all dependencies and source code
COPY --from=deps --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=deps --chown=appuser:nodejs /app/generated ./generated
COPY --from=deps --chown=appuser:nodejs /app/prisma ./prisma

# Copy source files
COPY --chown=appuser:nodejs . .

# Make entrypoint executable
RUN chmod +x ./entrypoint.sh

# Create node cache directory for corepack (before USER switch)
RUN mkdir -p /home/appuser/.cache/node/corepack && \
    chown -R appuser:nodejs /home/appuser

# Create logs directory
RUN mkdir -p /app/logs && chown appuser:nodejs /app/logs

# Switch to non-root user
USER appuser

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]
CMD ["pnpm", "start"]

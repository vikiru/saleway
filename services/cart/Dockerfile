# Multi-stage production build for Cart Service
FROM node:22-alpine AS base

# Install pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S appuser -u 1001 -G nodejs

WORKDIR /app

# Dependencies stage
FROM base AS deps

# Copy prisma schema first for layer caching
COPY prisma/schema.prisma ./prisma/
COPY pnpm-lock.yaml package.json ./

# Install production dependencies only
RUN pnpm fetch --prod

# Builder stage
FROM base AS builder

COPY pnpm-lock.yaml package.json ./
RUN pnpm fetch

COPY . .
RUN pnpm prisma generate
RUN pnpm build

# Production stage
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy production dependencies
COPY --from=deps --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/prisma ./prisma
COPY --from=builder --chown=appuser:nodejs /app/package.json ./

# Switch to non-root user
USER appuser

EXPOSE 8080

CMD ["pnpm", "start"]

FROM oven/bun:1.2.18-alpine AS base

WORKDIR /app

FROM base AS builder

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production

COPY . .

FROM base AS production

COPY --from=builder /app/src ./src
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/drizzle/ ./drizzle/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

EXPOSE 3001

CMD ["/bin/sh", "-c", "bun run migrate && bun run dev --host 0.0.0.0"]
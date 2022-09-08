FROM node:18-alpine
WORKDIR /app

RUN npm i -g pnpm

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY ./next.config.js ./
COPY ./public ./public
COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./

COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static
RUN pnpm install --prod --prefer-frozen-lockfile

USER nextjs

ENV PORT 3000

CMD ["node", "server.js"]

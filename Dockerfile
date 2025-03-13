FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@8.15.4

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

ARG NEXT_PUBLIC_LIFF_ID=2007056697-DPW5dXG3
ARG NEXT_PUBLIC_API_URL=https://dev-api.cuopenhouse2025.com/
ARG NEXT_PUBLIC_CDN_URL=https://cdn.cuopenhouse2025.com

ENV NEXT_PUBLIC_LIFF_ID=${NEXT_PUBLIC_LIFF_ID}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_CDN_URL=${NEXT_PUBLIC_CDN_URL}

RUN pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install -g pnpm@8.15.4

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

ARG NEXT_PUBLIC_LIFF_ID=2007056697-DPW5dXG3
ARG NEXT_PUBLIC_API_URL=https://dev-api.cuopenhouse2025.com/
ARG NEXT_PUBLIC_CDN_URL=https://cdn.cuopenhouse2025.com

ENV NEXT_PUBLIC_LIFF_ID=${NEXT_PUBLIC_LIFF_ID}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_CDN_URL=${NEXT_PUBLIC_CDN_URL}

RUN pnpm install --prod --ignore-scripts

EXPOSE 3000

CMD ["pnpm", "start"]

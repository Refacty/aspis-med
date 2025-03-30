FROM node:18-alpine AS builder

WORKDIR /app

# Copia o .env-example e renomeia para .env
COPY .env-example .env

COPY package*.json ./
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./.env

RUN npm install next

EXPOSE 3000
CMD ["npm", "start"]

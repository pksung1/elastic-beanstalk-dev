FROM node:lts

WORKDIR /app
RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run prisma:generate
RUN pnpm run build

ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

CMD node /app/dist/main

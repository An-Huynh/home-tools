FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json tsconfig.json index.ts .
COPY src src/

RUN npm ci
RUN npm run build

FROM node:18-alpine

COPY --from=build /app/dist /dist

EXPOSE 3000

WORKDIR /dist

CMD ["node", "."]
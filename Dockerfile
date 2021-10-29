FROM node:latest as node
WORKDIR /app
COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
RUN npm run build
FROM nginx:alpine
COPY --from=node /app/dist/demo-app /usr/share/nginx/html
EXPOSE 80
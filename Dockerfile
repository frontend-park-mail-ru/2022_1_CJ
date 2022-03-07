FROM node:17-alpine3.14 as builder

WORKDIR /frontend
COPY . .
RUN npm install

FROM nginx:1.21.6-alpine as nginx

COPY --from=builder /frontend/public /var/www/web
COPY  ./nginx/default.conf /etc/nginx/sites-enabled/default
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000

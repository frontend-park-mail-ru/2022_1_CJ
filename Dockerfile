FROM nginx:1.21.6-alpine as nginx

COPY /src /var/www/web
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/sites-enabled/default

EXPOSE 80

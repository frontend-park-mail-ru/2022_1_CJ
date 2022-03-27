FROM nginx:1.21.6-alpine as nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/docker.conf /etc/nginx/sites-enabled/default.conf

EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

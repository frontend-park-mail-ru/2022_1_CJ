#!/usr/bin/env bash

cp nginx/nginx.conf /etc/nginx/nginx.conf
cp nginx/default.conf /etc/nginx/sites-available/default.conf
ln -sf /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf
systemctl restart nginx.service
trap "echo -e '\nstopping nginx...'; systemctl stop nginx.service" SIGINT

rsync -az --delete src/ /var/www/web
echo "listening to changes in src directory..."
while inotifywait -rqq src/*; do
    bash scripts/precompile.sh
    bash scripts/pack.sh
    rsync -az --delete src/ /var/www/web
done

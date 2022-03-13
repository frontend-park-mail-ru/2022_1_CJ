#!/usr/bin/env bash

cp nginx/nginx.conf /etc/nginx/nginx.conf
cp nginx/default.conf /etc/nginx/sites-available/default.conf
ln -sf /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf
systemctl restart nginx.service

rsync -az src/ /var/www/web
while inotifywait -r src/*; do
    rsync -az src/ /var/www/web
done

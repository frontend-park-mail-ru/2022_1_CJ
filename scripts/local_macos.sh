#!/usr/bin/env bash

cp nginx/nginx.conf /etc/nginx/nginx.conf
cp nginx/default.conf /etc/nginx/sites-available/default.conf
ln -sf /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf
rsync -az --delete src/ /var/www/web
# nginx -s reload

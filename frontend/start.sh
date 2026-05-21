#!/bin/sh

# Replace ${BACKEND_URL} placeholder in nginx.conf with the real value
envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp
mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf

# Start Nginx
exec nginx -g 'daemon off;'
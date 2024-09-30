#!/bin/sh

node /usr/share/nginx/html/server/index.mjs &
nginx -g 'daemon off;'
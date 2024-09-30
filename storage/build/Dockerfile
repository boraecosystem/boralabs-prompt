# build stage
FROM node:18-alpine as build-stage
WORKDIR /var/www/html
RUN apk add --update --no-cache build-base python3 git
RUN npm install -g yarn --force
COPY package.json ./
COPY start.sh ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# deploy stage
FROM nginx:stable-alpine as deploy-stage
WORKDIR /usr/share/nginx/html
RUN apk add nodejs
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY --from=build-stage /var/www/html/.output /usr/share/nginx/html
COPY --from=build-stage /var/www/html/start.sh /usr/share/nginx/html
COPY --from=build-stage /var/www/html/storage/build/config/nginx.conf /etc/nginx/nginx.conf
RUN chmod +x /usr/share/nginx/html/start.sh

EXPOSE 8085
CMD ["sh", "/usr/share/nginx/html/start.sh"]

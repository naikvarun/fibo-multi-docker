FROM node as builder
WORKDIR '/app'
COPY ./package.json ./
RUN yarn install 
COPY ./public ./public
COPY ./src ./src
RUN yarn build

FROM nginx
EXPOSE 3000
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
FROM node
WORKDIR '/app'
COPY ./package.json ./
RUN yarn install 
COPY *.js ./
ENTRYPOINT [ "yarn", "start"]
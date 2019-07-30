FROM nginx:alpine

WORKDIR /usr/client

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src src/
COPY angular.json .
COPY tsconfig.json .
COPY tsconfig.app.json .

RUN yarn ng build --prod --output-path ./dist/

## Copy our default nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY ./dist /usr/share/nginx/html

EXPOSE 4300

CMD ["nginx", "-g", "daemon off;"]
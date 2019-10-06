FROM node:alpine

WORKDIR /usr/front

COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN yarn global add @angular/cli

COPY src src/
COPY angular.json .
COPY tsconfig.json .
COPY tsconfig.app.json .

EXPOSE 4200

CMD ng serve --host 0.0.0.0
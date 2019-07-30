FROM node:alpine

WORKDIR /usr/client

RUN yarn global add @angular/cli

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src src/
COPY angular.json .
COPY tsconfig.json .
COPY tsconfig.app.json .

EXPOSE 4300

CMD ["yarn", "start"]

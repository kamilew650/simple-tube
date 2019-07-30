FROM node:alpine

WORKDIR /usr/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src src/
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nodemon.json .

EXPOSE 8000

CMD ["yarn", "start:dev"]

FROM node:alpine

WORKDIR /usr/client

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src src/

EXPOSE 4200

CMD ["yarn", "start"]

FROM node:13.1.0-alpine

WORKDIR /usr/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src src/
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nodemon.json .

RUN tsc build --outDir=./dist/

EXPOSE 8000

CMD ["node", "./dist/main.js"]

FROM node:slim

WORKDIR /app

COPY . .

RUN yarn 
RUN yarn add axios

CMD yarn start
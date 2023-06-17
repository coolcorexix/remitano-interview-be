FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN set -x && yarn install --network-timeout 120000

COPY . .

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start:prod" ]

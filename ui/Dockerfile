FROM node:17.4.0

WORKDIR /usr/src/app

EXPOSE 3000

COPY package-lock.json ./
COPY package.json ./

RUN npm i

COPY . .


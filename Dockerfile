FROM node:17-alpine3.14 as builder

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "server/index.js"]

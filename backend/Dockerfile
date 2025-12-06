FROM node:lts-alpine3.23

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g tsx

COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["tsx", "server.ts"]
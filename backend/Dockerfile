FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN npm install -g typescript nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

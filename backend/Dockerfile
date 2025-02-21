FROM node:18-alpine AS builder

WORKDIR /app

RUN npm install -g typescript nodemon

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5173

ENV VITE_HOST=0.0.0.0

CMD ["npm", "run", "dev", "--", "--host"]

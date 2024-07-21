# Usar la imagen base de Node.js
FROM node:17.8.0-alpine3.14

# Establecer el directorio de trabajo
WORKDIR /app

COPY . /app

RUN npm install

RUN npm install -g @vue/cli

EXPOSE 3000

COPY . .
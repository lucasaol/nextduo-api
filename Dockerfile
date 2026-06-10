FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# RUN npm run migration:run

EXPOSE 3333
CMD ["npm", "run", "start:dev"]
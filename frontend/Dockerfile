FROM node:lts-slim

# Configure host
ENV HOST 0.0.0.0

WORKDIR /var/www/nuxt
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]


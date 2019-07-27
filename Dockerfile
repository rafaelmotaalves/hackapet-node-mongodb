FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .

RUN npm install
# Bundle app source
COPY . .

# Exports
EXPOSE 3000
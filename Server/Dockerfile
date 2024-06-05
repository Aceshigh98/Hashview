# Description: Dockerfile for the server

# Use an official Node.js runtime as the parent image
FROM node:22-alpine

# Install build tools
RUN apk add --no-cache python3 make g++

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json to the working directory
COPY package.json .



# Rebuild native modules
RUN npm rebuild bcrypt --build-from-source

# Install app dependencies
RUN npm install 

# Set the working directory in the container to /app
COPY . .

#COPY /etc/letsencrypt/live/www.hash-view.com/* /etc/letsencrypt/live/www.hash-view.com/* 

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]




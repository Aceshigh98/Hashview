# Description: Dockerfile for the client

# Use an official Node.js runtime as the parent image
FROM node:22-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json to the working directory
COPY package.json .

# Install app dependencies
RUN npm install 

# Set the working directory in the container to /app
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 443

# Run the server
CMD ["npm", "start"]
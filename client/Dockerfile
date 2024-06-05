# Description: Dockerfile for the client

# Use an official Node.js runtime as the parent image
FROM node:22-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json 
COPY package.json .

# Install app dependencies
RUN npm install 

# Copy the rest of the application files to the working directory
COPY . .

# Set the HTTPS environment variable to true
ENV HTTPS=true

# Build the React app
RUN npm run build

# Make port 443 available to the world outside this container
EXPOSE 443

# Run the server
CMD ["npm", "start"]


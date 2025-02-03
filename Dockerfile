# Use Node.js 16 image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the backend's package.json and package-lock.json (if present)
COPY package*.json ./

# Install the backend dependencies
RUN npm install

# Copy the entire backend code to the working directory
COPY . .

# Expose the backend port (8000 in your case)
EXPOSE 8000

# Command to run the backend
CMD ["npm", "start"]

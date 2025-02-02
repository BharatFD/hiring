# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install TypeScript globally (if it's not in package.json)
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript (assuming your source is in the 'src' folder)
RUN tsc -b

# Expose port 8000
EXPOSE 8000

# Command to run the application (assuming your compiled code is in the 'dist' folder)
CMD ["node", "dist/server.js"]

# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (match your Express.js port)
EXPOSE 8000

# Start application
CMD ["npm", "run", "dev"]

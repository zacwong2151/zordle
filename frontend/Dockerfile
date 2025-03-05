# Use official Node.js image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Use a lightweight web server (Nginx) to serve the built frontend
FROM nginx:alpine

# Add custom Nginx config for React Router (for deployment to Fly.io)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

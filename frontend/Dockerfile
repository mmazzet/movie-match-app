# BUILD the React app
FROM node:24-slim AS builder
WORKDIR /app

# Copy package files first (so Docker can cache the install step)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Pass the API URL as a build argument and set it as an environment variable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the app into static files (output goes to /app/dist)
RUN npm run build


# SERVE the built files with Nginx
FROM nginx:stable-alpine

# Copy the built files from Stage 1 into Nginx's serving folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
# Dockerfile
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy the placeholder package.json to prevent build errors before project creation.
COPY package.json ./

# Copy the rest of the application code (including init.sh)
COPY . .

# Astro runs on port 4321 by default
EXPOSE 4321

# Install dependencies
RUN pnpm install

# Default command for development (will be overridden during init)
CMD ["pnpm", "run", "dev", "--host"]
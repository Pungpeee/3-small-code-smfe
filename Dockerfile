FROM node:18-alpine

# Create and set the working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Copy application code
COPY . .

RUN npm install
RUN npm run build

# Expose the application port
EXPOSE 3000

# Use JSON array syntax for CMD
CMD ["npm", "start"]

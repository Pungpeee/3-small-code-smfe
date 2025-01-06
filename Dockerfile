FROM node:16.15.0-alpine3.15


WORKDIR /usr/src/app



COPY package*.json ./

# Install dependencies
RUN npm install 



COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

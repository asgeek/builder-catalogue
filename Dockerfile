# stage 1 - build stage
FROM node:20-alpine as builder
 
WORKDIR /usr/src/app
 
COPY package*.json ./

RUN npm install nodemon

RUN npm install

COPY . .

RUN npm run build

# stage 2

# Stage 2: Set up the runtime environment
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only the built artifacts and necessary files from the previous stage
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Expose the port your app runs on
EXPOSE 3000

# Step 8: Start the Next.js app
CMD ["npm", "start"]

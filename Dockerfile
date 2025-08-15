# -------- Stage 1: Build React frontend --------
FROM node:20 as client-build

WORKDIR /app/client

COPY client/package.json client/yarn.lock ./
RUN yarn install

COPY client ./
RUN yarn build


# -------- Stage 2: Install backend --------
FROM node:20

# Set working directory
WORKDIR /app

# Copy backend package and install dependencies
COPY server/package.json server/yarn.lock ./server/
RUN cd server && yarn install

# Copy full backend code
COPY server ./server

# Copy frontend build into backend's public folder
# COPY --from=client-build /app/client/dist ./server/client/dist
COPY --from=client-build /app/client/dist ./client/dist


# Set environment to production
ENV NODE_ENV=production

# Set working directory to backend
WORKDIR /app/server

# Expose backend port
EXPOSE 5001

# Run server
CMD ["node", "app.js"]

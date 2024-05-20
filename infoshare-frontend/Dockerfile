# Stage 1: Build
FROM node:20.13.1 AS build

WORKDIR /app

ENV PORT=8080
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_COOKIE_KEYS_PREFIX=_infoshare_
ENV REACT_APP_AVAILABLE_LANGUAGES=en-UK,en-US,tr-TR
ENV REACT_APP_DEFAULT_LANGUAGE=tr-TR
ENV REACT_APP_API_URL=https://infoshare-backend-vh5r3eqwyq-uc.a.run.app/api

# Copy required files
COPY . .

RUN npm install

RUN npm run build

# Stage 2: Run
FROM node:20.13.1-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/packages/web/build ./build

# Install a simple web server to serve the built files
RUN npm install -g serve

# Expose the port on which the app runs
EXPOSE 8080

# Command to run the app
CMD ["serve", "-s", "build"]

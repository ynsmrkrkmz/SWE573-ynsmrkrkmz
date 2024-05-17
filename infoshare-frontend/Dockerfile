FROM node:lts-alpine AS build-stage

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

# Delete .env file to prevent unexpected issues
RUN rm -rf packages/web/.env

WORKDIR /app/packages/web

# Install dependencies for packages
RUN npm install --only=production --no-audit --no-fund --fetch-timeout=100000

# build application
RUN npm run build

# Create new stage for optimizing the built image
FROM nginx:1.20.2-alpine

WORKDIR /app

# copy from built image
COPY --from=build-stage /app/packages/web/build /usr/share/nginx/html
COPY --from=build-stage /app/packages/web/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

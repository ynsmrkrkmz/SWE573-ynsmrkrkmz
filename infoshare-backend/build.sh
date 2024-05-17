#!/bin/bash

# Define the name of the Docker image
IMAGE_NAME="us-central1-docker.pkg.dev/infoshare-423320/infoshare/infoshare-backend"

# Build the Docker image using the Dockerfile
docker build --build-arg SPRING_PROFILE=prod -t $IMAGE_NAME . --no-cache

docker push $IMAGE_NAME

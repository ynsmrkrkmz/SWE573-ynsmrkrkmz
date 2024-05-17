#!/bin/sh
IMAGE_NAME="us-central1-docker.pkg.dev/infoshare-423320/infoshare/infoshare-web"
docker build -f Dockerfile . --tag $IMAGE_NAME --platform linux/amd64 --no-cache
docker push $IMAGE_NAME

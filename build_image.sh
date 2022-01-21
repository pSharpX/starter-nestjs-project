#!/bin/sh
echo Building psharpx/techstore-api:v1.0

docker build --no-cache -t psharpx/techstore-api:v1.0 . -f Dockerfile

echo Building was successful !!...

read -n 1 -s -r -p "Press any key to continue"
#!/usr/bin/env bash

# nameNetwrokApi=$(docker network ls | grep mongo-go | awk '{{print $2}}')
# docker run -d -p 80:80 --network $nameNetwrokApi --name=cj-frontend cj-frontend:latest
docker run -d -p 80:80 --name=cj-frontend cj-frontend:latest

if  echo $(curl -v --stderr - http://localhost) | grep  -q "Failed to connect" ; then
    echo "failed"
    exit 1
fi

echo "running"

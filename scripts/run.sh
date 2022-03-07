#!/usr/bin/env bash

nameNetwrokApi=$(docker network ls | grep mongo-go | awk '{{print $2}}')
docker run -d -p 8000:8000 --network $nameNetwrokApi --name=cj-frontend cj-frontend:latest

sleep 3
if  echo $(curl -v --stderr - http://localhost:8080) | grep  -q "Failed to connect" ; then
    echo "failed"
    exit 1
fi

echo "running"

#!/usr/bin/env bash

docker run -d -p 8080:8080 --name=cj-frontend cj-frontend:latest

if  echo $(curl -v --stderr - http://localhost:8080) | grep  -q "Failed to connect" ; then
    echo "failed"
    exit 1
fi

echo "running"

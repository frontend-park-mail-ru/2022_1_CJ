#!/usr/bin/env bash

docker run -d -p 80:80 --name=frontend frontend:latest

if  echo $(curl -v --stderr - http://localhost) | grep  -q "Failed to connect" ; then
    echo "failed"
    exit 1
fi

echo "running"

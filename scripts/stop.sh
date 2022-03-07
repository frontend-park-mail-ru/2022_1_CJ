#!/usr/bin/env bash

id=$(docker ps -a | grep cj-frontend | awk '{{ print $1}}')
if [ -z "$id" ]
then
  echo "no running container"
else
  docker rm -f $(docker ps -a | grep cj-frontend | awk '{{ print $1}}')
  echo "stopped running container"
fi

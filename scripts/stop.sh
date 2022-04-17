#!/usr/bin/env bash

id=$(docker ps -a | grep frontend | awk '{{ print $1}}')
if [ -z "$id" ]
then
  echo "no running container"
else
  docker rm -f $(docker ps -a | grep frontend | awk '{{ print $1}}')
fi

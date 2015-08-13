#!/bin/bash

. ${0%/*}/lib.bash

echo
echo "Remove stopped container ..."
docker rm $(docker ps -a | awk '/Exited/ {print $1}')

echo
echo "Remove untagged images ..."
docker rmi $(docker images -q --filter "dangling=true")


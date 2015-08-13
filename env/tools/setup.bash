#!/bin/bash


# stop service
service docker stop


# prepare fs
mkdir -p /appl/docker/runtime
mkdir -p /appl/docker/tmp
cd /var/lib
rmdir /var/lib/docker
ln -s /appl/docker/runtime /var/lib/docker


# configure docker
cat << EOF >> /etc/default/docker
export DOCKER_OPTS="-H 127.0.0.1:4243 -H unix:///var/run/docker.sock -r=false -g /appl/docker/runtime"
export TMPDIR="/appl/docker/tmp"
EOF


# add users to group docker
usermod -a -G docker benni


# start service
service start docker



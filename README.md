# Description

This is a base repo for my work with docker. Here you can find:
* configuration
* images
* some tools


# Setup

## install software 
* arch linux: pacman -S docker git
* debian: apt-get install docker git

## clone the repository
* git clone https://github.com/bboortz/docker-base.git

## configure the the docker service

### systemd
* systemctl enable docker
* edit /usr/lib/systemd/system/docker.service. You can use the file examples/docker.service .
* systemctl daemon-reload
* systemctl restart docker

### debian
* edit /etc/default/docker
* service docker restart

## test
* docker info

# Usage


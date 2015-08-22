# Description

This is a base repo for my work with docker. Here you can find:
* configuration
* images
* some tools


# Setup

* install docker and git
** arch linux: pacman -S docker git
** debian: apt-get install docker git
* git clone https://github.com/bboortz/docker-base.git
* configure your docker service
** systemd users
*** systemctl enable docker
*** edit /usr/lib/systemd/system/docker.service.
**** you can use the file examples/docker.service
*** systemctl daemon-reload
*** systemctl restart docker
** debian
*** edit /etc/default/docker
*** service docker restart
* docker info

Usage


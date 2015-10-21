#!/bin/bash

. ${0%/*}/../../tools/lib.bash

USER=user_iceweasel


docker run -i -t -e DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix -v $HOME/.Xauthority:/home/${USER}/.Xauthority --net=none gedit


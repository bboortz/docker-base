#!/bin/bash

# configure
ssh-keygen -f /home/$USER/.ssh/ssh_host_rsa_key -N '' -t rsa -vvvvvv
ssh-keygen -f /home/$USER/.ssh/ssh_host_ecdsa_key -N '' -t ecdsa
ssh-keygen -f /home/$USER/.ssh/ssh_host_ed25519_key -N '' -t ed25519
chmod 700 /home/$USER /home/$USER/.ssh && chmod 600 /home/$USER/.ssh/* && chown -R $USER:$USER /home/$USER


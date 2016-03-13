#!/bin/sh
set -u
set -e

USER_SSH=user_ssh
echo "USER: $USER"
echo "CREATE_USER: $CREATE_USER"
echo "CREATE_KEY: $CREATE_KEY"
echo

# create user
adduser $CREATE_USER --gecos "" --disabled-password 
usermod -a -G user_ssh benni
usermod -a -G benni user_ssh

# set ssh settings
mkdir -p /home/$CREATE_USER/.ssh /home/$CREATE_USER/.sshd
#cp /home/$USER_SSH/.ssh/ssh_host_rsa_key /home/$USER_SSH/.ssh/ssh_host_dsa_key /home/$USER_SSH/.ssh/ssh_host_ecdsa_key /home/$USER_SSH/.ssh/ssh_host_ed25519_key /home/$USER_SSH/.ssh/sshd_config /home/$CREATE_USER/.ssh/
echo "$CREATE_KEY" > /home/$CREATE_USER/.ssh/authorized_keys
cp /home/$USER_SSH/.ssh/ssh_host_rsa_key /home/$USER_SSH/.ssh/ssh_host_ecdsa_key /home/$USER_SSH/.ssh/ssh_host_ed25519_key /home/$USER_SSH/.ssh/sshd_config /home/$CREATE_USER/.sshd/
chmod 700 /home/$CREATE_USER 
chmod 700 /home/$CREATE_USER/.ssh
chmod 700 /home/$CREATE_USER/.sshd
chmod 640 /home/$CREATE_USER/.ssh/*
chmod 600 /home/$CREATE_USER/.sshd/*
chown -R $CREATE_USER:$USER /home/$CREATE_USER



# start ssh daemon
echo "sshd started ..."
su - benni -c "/usr/sbin/sshd -f ~/.sshd/sshd_config -D -E ~/.sshd/sshd.log"

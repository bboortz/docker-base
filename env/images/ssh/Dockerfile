FROM debian_base:latest

ENV USER user_ssh
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get install -y locales ca-certificates openssh-server

RUN apt-get install -y locales
RUN dpkg-reconfigure locales && \
  locale-gen C.UTF-8 && \
  /usr/sbin/update-locale LANG=C.UTF-8
# Install needed default locale for Makefly
RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen && \
  locale-gen
# Set default locale for the environment
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# add user
RUN adduser $USER --gecos "" --disabled-password && chmod 700 /home/$USER 
RUN mkdir -p /home/$USER/.ssh

# configure
RUN ssh-keygen -f /home/$USER/.ssh/ssh_host_rsa_key -N '' -t rsa -vvvvvv
#RUN ssh-keygen -f /home/$USER/.ssh/ssh_host_dsa_key -N '' -t dsa
RUN ssh-keygen -f /home/$USER/.ssh/ssh_host_ecdsa_key -N '' -t ecdsa
RUN ssh-keygen -f /home/$USER/.ssh/ssh_host_ed25519_key -N '' -t ed25519
ADD start.sh /home/$USER/start.sh
ADD sshd_config /home/$USER/.ssh/sshd_config
RUN chmod 700 /home/$USER /home/$USER/.ssh && chmod 600 /home/$USER/.ssh/* && chown -R $USER:$USER /home/$USER

# run it
ENTRYPOINT [ "/home/user_ssh/start.sh" ]
CMD [ "user", "publickey" ]

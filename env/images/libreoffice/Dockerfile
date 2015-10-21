FROM debian_base:latest

ENV USER user_libreoffice

RUN apt-get install -y libreoffice

# add user
RUN adduser $USER --gecos "" --disabled-password 

# run it
USER $USER
ENV HOME /home/$USER
CMD [ "/usr/bin/libreoffice" ]

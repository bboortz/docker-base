FROM debian_base:latest

ENV USER user_gedit

RUN apt-get install -y gedit gedit-latex-plugin gedit-plugins 

# add user
RUN adduser $USER --gecos "" --disabled-password 

# run it
USER $USER
ENV HOME /home/$USER
CMD [ "/usr/bin/gedit" ]

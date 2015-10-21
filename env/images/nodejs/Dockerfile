FROM centos_base

ENV USER user_nodejs
ENV HOME /home/$USER

RUN useradd -m $USER
RUN curl --silent --location https://rpm.nodesource.com/setup | bash - && \
	yum -y install nodejs npm gcc-c++ make

ADD ./server.js /tmp/server.js


USER $USER
EXPOSE 8080
ENTRYPOINT [ "/usr/bin/node" ]
CMD [ "/tmp/server.js" ]

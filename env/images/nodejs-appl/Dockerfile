FROM centos_base

ENV USER user_nodejs
ENV HOME /home/$USER
ENV WORKDIR /src

RUN useradd -m $USER
RUN curl --silent --location https://rpm.nodesource.com/setup | bash - && \
	yum -y install nodejs npm gcc-c++ make && \
	mkdir -p $WORKDIR

COPY ./src $WORKDIR
WORKDIR $WORKDIR
RUN npm install

USER $USER
EXPOSE 8888
ENTRYPOINT [ "/usr/bin/node" ]
CMD [ "/src/index.js" ]

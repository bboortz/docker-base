# basics
FROM centos_base


# set environment variables
ENV USER user_haproxy
ENV HOME /home/$USER
ENV WORKDIR /appl
ENV MONGODB_VERSION linux-x86_64-rhel70-3.0.4
ENV MONGODB_NAME mongodb-${MONGODB_VERSION}
ENV MONGODB_PATH ${WORKDIR}/${MONGODB_NAME}


# create user
RUN useradd -m $USER && \
        mkdir -p  $WORKDIR/cfg


# install other packages
COPY ./repo/haproxy $WORKDIR/
COPY ./cfg/haproxy.cfg $WORKDIR/cfg/
RUN chown -R $USER.$USERA $WORKDIR 


# expose a port
EXPOSE 8080


# run the application
USER $USER
WORKDIR $WORKDIR
ENTRYPOINT ["/appl/haproxy", "-V", "-f", "/appl/cfg/haproxy.cfg"]



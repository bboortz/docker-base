# basics
FROM centos_base


# set environment variables
ENV USER user_mongodb
ENV HOME /home/$USER
ENV WORKDIR /appl
ENV MONGODB_VERSION linux-x86_64-rhel70-3.0.4
ENV MONGODB_NAME mongodb-${MONGODB_VERSION}
ENV MONGODB_PATH ${WORKDIR}/${MONGODB_NAME}


# create user
RUN useradd -m $USER && \
        mkdir -p  $WORKDIR/data 


# install other packages
COPY ./repo/${MONGODB_NAME}.tgz $WORKDIR/
RUN tar -zxf ${MONGODB_PATH}.tgz -C $WORKDIR && \
	chown -R $USER.$USER $WORKDIR


# expose a port
EXPOSE 27017


# run the application
USER $USER
WORKDIR $WORKDIR
#ENTRYPOINT ["${MONGODB_PATH}/bin/mongod", "--dbpath", "/appl/data/"]
ENTRYPOINT ["/appl/mongodb-linux-x86_64-rhel70-3.0.4/bin/mongod", "--dbpath", "/appl/data/"]



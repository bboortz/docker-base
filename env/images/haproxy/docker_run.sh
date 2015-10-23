#!/bin/bash

IMAGE_SHORT="${PWD##*/}"
IMAGE_NAME=$(cat last_image)
IMAGE_PATH=$( readlink -f ${0%/*} )
#docker run -p 8080:8080 -i -t $IMAGE_NAME
#docker run -d -p 28080:8080 --name ${IMAGE_SHORT} ${IMAGE_NAME}
#docker run -d -p 28080:8080 -v /home/appluser/files/docker-dev/tomcat_appl/webapp:/appl/apache-tomcat-8.0.24/webapps/ --name ${IMAGE_SHORT} ${IMAGE_NAME}
#docker run -i -t  -p 28080:8080 -v /home/appluser/files/docker-dev/tomcat_appl/webapp:/appl/apache-tomcat-8.0.24/webapps/ --name ${IMAGE_SHORT} ${IMAGE_NAME}
#docker run -i -t  -p 18080:8080 -v ${IMAGE_PATH}/cfg:/appl/cfg --name ${IMAGE_SHORT} ${IMAGE_NAME}
#docker run -i -t  -p 18080:8080 -v ${IMAGE_PATH}/cfg:/appl/cfg --name ${IMAGE_SHORT} ${IMAGE_NAME}
docker run -i -t  -p 18080:8080 -v ${IMAGE_PATH}/cfg:/appl/cfg --link tomcat_appl:tomcat_appl1 --name ${IMAGE_SHORT} ${IMAGE_NAME}


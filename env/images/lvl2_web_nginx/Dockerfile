FROM lvl1_base_alpine:latest


ENV USER www
ENV GROUP www
ENV HOME /home/$USER


RUN apk update 
RUN apk upgrade --available
RUN sync 
RUN adduser -D -u 20101 -g $GROUP $USER 
RUN apk add nginx

RUN mkdir -p /opt/www/bin
RUN mkdir -p /opt/www/conf
RUN mkdir -p /opt/www-run/logs
RUN mkdir -p /opt/www-run/run
RUN mkdir -p /opt/www-run/tmp
RUN mkdir -p /opt/www-run/html
RUN touch /opt/www-run/logs/error.log
RUN cp /usr/sbin/nginx /opt/www/bin/
RUN cp /etc/nginx/nginx.conf /opt/www/conf/
RUN cp /etc/nginx/mime.types /opt/www/conf/
COPY ./conf/nginx.conf /opt/www/conf/
COPY ./html/* /opt/www-run/html/
RUN chown -R $USER:$GROUP /opt
#RUN mkdir /opt/www && chown -R $USER:$GROUP /var/lib/nginx && chown -R $USER:$GROUP /www


#USER $USER

EXPOSE 8080
EXPOSE 8443
ENTRYPOINT [ "/opt/www/bin/nginx", "-p", "/opt/www-run", "-g", "daemon off;", "-c", "/opt/www/conf/nginx.conf"]


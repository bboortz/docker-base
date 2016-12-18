FROM alpine:latest

RUN apk update 
RUN apk upgrade --available
RUN sync && reboot

RUN mkdir /opt
RUN chmod 700 /opt


FROM lvl1_base_alpine:latest


ENV USER consul
ENV GROUP consul
ENV HOME /home/$USER


RUN apk update 
RUN apk upgrade --available
RUN apk add wget unzip
RUN sync 
RUN adduser -D -u 20201 -g $GROUP $USER 

RUN mkdir -p /opt/consul/bin
RUN mkdir -p /opt/consul/conf
RUN mkdir -p /opt/consul/logs
RUN mkdir -p /opt/consul/html
RUN mkdir -p /opt/consul/data
RUN wget --no-check-certificate https://releases.hashicorp.com/consul/0.7.1/consul_0.7.1_linux_amd64.zip && unzip consul_0.7.1_linux_amd64.zip && cp consul /opt/consul/bin/
RUN wget --no-check-certificate https://releases.hashicorp.com/consul/0.7.1/consul_0.7.1_web_ui.zip && unzip consul_0.7.1_web_ui.zip && cp -r index.html static /opt/consul/html/
RUN chown -R $USER:$GROUP /opt


USER $USER

EXPOSE 8500
ENTRYPOINT [ "/opt/consul/bin/consul", "agent", "-server", "-bootstrap", "-data-dir=/opt/consul/data", "-ui", "-ui-dir=/opt/consul/html", "-atlas=consul/main", "-atlas-token=838gj4g4ujg4ugjunfuf3f", "-bind=0.0.0.0", "-client=0.0.0.0" ]


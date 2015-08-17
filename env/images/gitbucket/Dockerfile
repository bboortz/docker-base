FROM mw_java
ENV USER gitbucket
ENV HOME /home/$USER
ENV GITBUCKET_VERSION 3.5
ENV GITBUCKET_TGZ_URL https://github.com/takezoe/gitbucket/releases/download/$GITBUCKET_VERSION/gitbucket.war

USER $USER
WORKDIR $HOME
RUN curl -SL "$GITBUCKET_TGZ_URL" -o gitbucket.war 

EXPOSE 8080
ENTRYPOINT [ "java -jar $HOME/gitbucket.war" ]

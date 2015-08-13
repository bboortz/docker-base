FROM mw_java
ENV USER jetty
ENV HOME /home/$USER
ENV JETTY_HOME /appl/jetty
ENV JETTY_BASE /appl/jetty_base
ENV JETTY_VERSION 9.3.2.v20150730
ENV JETTY_TGZ_URL https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-distribution/$JETTY_VERSION/jetty-distribution-$JETTY_VERSION.tar.gz

RUN useradd -m $USER && \
	mkdir -p "$JETTY_HOME" && \
	chown $USER.$USER $JETTY_HOME && \
	mkdir -p "$JETTY_BASE" && \
	chown $USER.$USER $JETTY_BASE

USER $USER
WORKDIR $JETTY_HOME
RUN curl -SL "$JETTY_TGZ_URL" -o jetty.tar.gz && \
	tar -xzf jetty.tar.gz --strip-components=1 && \
	rm jetty.tar.gz 

WORKDIR $JETTY_BASE
ENTRYPOINT [ "$JETTY_HOME/bin/jetty.sh" ]
CMD [ "run" ]

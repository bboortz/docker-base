FROM nodejs_base

ENV USER user_nodejs
ENV HOME /home/$USER
ENV WORKDIR /src

RUN useradd -m $USER && \
	mkdir -p  $WORKDIR

COPY ./src $WORKDIR
WORKDIR $WORKDIR
RUN npm install

USER $USER
EXPOSE 8888
ENTRYPOINT [ "/usr/bin/node" ]
CMD [ "/src/index.js" ]

FROM mw_java
ENV USER eclipse
ENV HOME /home/$USER
RUN useradd -m $USER && \
	pacman -S --noconfirm ttf-dejavu eclipse-java && \
	pacman -Scc
RUN  fc-cache -vfs
USER $USER
ENTRYPOINT [ "/usr/bin/eclipse" ]

FROM mw_java
ENV USER eclipse
ENV HOME /home/$USER
RUN useradd -m $USER && \
	mkdir $HOME/workspace && \
	pacman -S --noconfirm ttf-dejavu eclipse-java maven && \
	pacman -Scc && \
	fc-cache -vfs
USER $USER
ENTRYPOINT [ "/usr/bin/eclipse" ]

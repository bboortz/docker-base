FROM os_archlinux
ENV USER firefox
ENV HOME /home/$USER
RUN useradd -m $USER && \
	pacman -S --noconfirm ttf-dejavu firefox && \
	pacman -Scc && \
	fc-cache -vfs
USER $USER
ENTRYPOINT [ "/usr/bin/firefox" ]

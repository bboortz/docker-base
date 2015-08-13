FROM base/archlinux
#COPY mirrorlist /etc/pacman.d/mirrorlist
# cleanup gpg signatures for pacman, reload pacman cache, update the system, update the pacman db and clear the package cache
RUN rm -R /etc/pacman.d/gnupg && \
	pacman-key --init && \ 
	pacman-key --populate archlinux && \
	pacman-key --refresh-keys && \
	pacman -Syyu --noconfirm && \ 
	pacman-db-upgrade && \ 
	pacman -Scc 

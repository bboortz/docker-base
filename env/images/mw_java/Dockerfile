FROM os_archlinux
ENV JAVA_HOME /usr/lib/jvm/default-runtime
ENV JAVA_BIN $JAVA_HOME/bin
RUN pacman -S --noconfirm jre8-openjdk jre8-openjdk-headless jdk8-openjdk openjdk8-doc && \
	pacman -Scc 

FROM debian_base:latest

ENV USER user_chromium

RUN apt-get install -y --no-install-recommends \
	libcanberra-gtk-module \
	libexif-dev \
	libpango1.0-0 \
	libv4l-0 \
	ca-certificates \
	fonts-liberation \
	gconf-service \
	hicolor-icon-theme \
	libappindicator1 \
	libasound2 \
	libcurl3 \
	libgconf-2-4 \
	libgl1-mesa-dri \
	libgl1-mesa-glx \
	libnspr4 \
	libnss3 \
	libxss1 \
	libxtst6 \
	wget \
	xdg-utils \
	&& \
	wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -P /tmp/ \
	&& \
	dpkg -i /tmp/google-chrome-stable_current_amd64.deb || true \
	&& \
	mkdir -p /etc/chromium.d/

# add user
RUN adduser $USER --gecos "" --disabled-password 
USER $USER
ENV HOME /home/$USER

# configure
RUN mkdir -p /home/$USER/Downloads

# run it
ENTRYPOINT [ "/usr/bin/google-chrome" ]
CMD [ "--temp-profile", "--incognito", "--no-sandbox" ]

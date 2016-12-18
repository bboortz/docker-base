# build

docker build -t lvl2_web_nginx .

# run

docker run -it -p 8080:8080 -p 8443:8443 lvl2_web_nginx

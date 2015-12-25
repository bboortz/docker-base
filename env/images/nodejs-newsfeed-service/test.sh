#!/bin/bash

curl --data "name=Spiegel.de index&url=http://www.spiegel.de/schlagzeilen/tops/index.rss" http://localhost:8080/api/feeds
curl --data "name=zeit.de index&url=http://newsfeed.zeit.de/index" http://localhost:8080/api/feeds
curl --data "name=fefe.de&url=https://blog.fefe.de/rss.xml" http://localhost:8080/api/feeds
curl http://localhost:8080/api/feeds

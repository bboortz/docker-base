#!/bin/bash

curl --data "name=Spiegel.de&url=http://www.spiegel.de/schlagzeilen/tops/index.rss" http://localhost:8080/api/feeds
curl http://localhost:8080/api/feeds

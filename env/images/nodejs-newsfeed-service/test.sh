#!/bin/bash

curl --data "name=Spiegel.de index&url=http://www.spiegel.de/schlagzeilen/tops/index.rss" http://localhost:8080/api/feed
curl --data "name=zeit.de index&url=http://newsfeed.zeit.de/index" http://localhost:8080/api/feed
curl --data "name=zeit.de Digital&url=http://newsfeed.zeit.de/digital/index" http://localhost:8080/api/feed
curl --data "name=fefe.de&url=https://blog.fefe.de/rss.xml" http://localhost:8080/api/feed
curl --data "name=heise.de Heute&url=http://www.heise.de/tp/rss/news.rdf" http://localhost:8080/api/feed
curl --data "name=heise.de letzte 7 Tage&url=http://www.heise.de/tp/rss/news-xl.rdf" http://localhost:8080/api/feed
curl --data "name=slashdot.org linux&url=http://rss.slashdot.org/Slashdot/slashdotLinux" http://localhost:8080/api/feed
curl --data "name=golem.de&url=http://rss.golem.de/rss.php?feed=RSS2.0" http://localhost:8080/api/feed
curl --data "name=focus.de&url=http://rss.focus.de/fol/XML/rss_folnews.xml" http://localhost:8080/api/feed
curl --data "name=faz.net&url=http://www.faz.net/rss/aktuell/" http://localhost:8080/api/feed
curl http://localhost:8080/api/feed

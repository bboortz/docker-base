#!/bin/bash


curl --data "feed=fefe.de&url=https://blog.fefe.de/?ts=a883f72c&title=Test&description=Test Desc&pubdate=2015-12-25T14:15:55.000Z" http://localhost:8081/api/feedentry
curl --data "feed=fefe.de&url=https://blog.fefe.de/?ts=a883f72c&title=Test2&description=Test Desc&pubdate=2015-12-25T14:15:55.000Z" http://localhost:8081/api/feedentry
curl --data "feed=fefe.de&url=https://blog.fefe.de/?ts=A883F72C&title=Test2&description=Test Desc&pubdate=2015-12-25T14:15:55.000Z" http://localhost:8081/api/feedentry
curl -H "Content-Type: application/json" -X POST -d '{"feed":"zeit.de digital","url":"http://www.zeit.de/digital/mobil/2015-12/brasilien-whatsapp-gerichtsurteil","title":"huhu","description":"lala","pubdate":"2015-12-17T04:09:54.000Z"}' http://localhost:8081/api/feedentry
curl http://localhost:8081/api/feedentry

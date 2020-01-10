# yellow-pages-svc

Simple service getting people information by query string


#### install & start
* yarn
* yarn start 
## Docs 

* ```/yellowPages/isAlive``` - endpoint for checking the availability of the service.

The response is constant with dynamic current date:
```
{
    "message": "yellowPages server is alive: Sat Dec 21 2019 18:03:22 GMT+0200 (Israel Standard Time)"
}
```

* ```/yellowPages/search/``` - get relevant results for query string:

    params: queryString : string for people search (should be at least 2 characters).

    example: /yellowPages/search?queryString=john

    sample response:
```
{
    "people": [
        {
            "picture": "image4.png",
            "birthday": "2008-12-02T04:00:47 -02:00",
            "name": "Lisa Mejia",
            "address": "532 Tabor Court, Elizaville, Nevada, 1545",
            "age": 11
        },
        {
            "picture": "image9.png",
            "birthday": "1948-03-31T08:21:53 -02:00",
            "name": "Gallegos Aguilar",
            "address": "796 Merit Court, Kraemer, Nevada, 3463",
            "age": 71
        },
        {
            "picture": "image4.png",
            "birthday": "1980-11-13T07:41:42 -02:00",
            "name": "Craft Bender",
            "address": "639 Farragut Road, Reno, Nevada, 6730",
            "age": 39
        }
    ]
}
```


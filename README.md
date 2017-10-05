### Environment Variables

Create .env.development and .env.production files with the following template:

* GA_CALLBACK= // google's credentials
* GA_CLIENT_ID= // google's credentials

* CLUSTERS= // string of json file that describes clusters

```
[
  {
    "name": "North America",
    "host": "http://some.host.domain:port"
  }
]
```

* GRAPH_HOST= // host of graph api, optional
* DATADOG_API_KEY= // optional
* DATADOG_APPLICATION_KEY= // optional

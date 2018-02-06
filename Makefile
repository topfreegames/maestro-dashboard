# maestro-stag.tfgco.com as backend
stag-dev: CLUSTERS='[{"name":"Staging","host":"http://maestro-stag.tfgco.com"}]' PORT=8080 NODE_ENV=development GA_CALLBACK=http://localhost:8080/ga_callback GRAPH_HOST=http://localhost:8080 node server.js

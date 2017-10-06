FROM node:8.6.0
EXPOSE 8080
RUN mkdir -p /var/apps/maestro-dashboard
WORKDIR /var/apps/maestro-dashboard
COPY package.json /var/apps/maestro-dashboard
RUN npm install
COPY . /var/apps/maestro-dashboard

ENV NODE_ENV development
ENV PORT 8080
ENV GA_CALLBACK http://localhost:8080/ga_callback
# ENV GA_CLIENT_ID
ENV CLUSTERS '[{"name":"North America","host":"http://localhost:5001"},{"name":"South America","host":"http://localhost:5001"},{"name":"Asia Pacific","host":"http://localhost:5001"}]'
ENV GRAPH_HOST http://localhost:8080
# ENV DATADOG_API_KEY
# ENV DATADOG_APPLICATION_KEY

CMD ["sh", "ci/docker-start.sh"]

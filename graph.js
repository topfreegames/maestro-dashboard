const cache = require('memory-cache')
const request = require('request-promise')

const graphDef = (scheduler, region) =>
  `{
    "viz": "timeseries",
    "status": "done",
    "requests": [
      {
        "q": "max:maestro.gru.ready{maestro-scheduler:${scheduler},maestro-region:${region}} + max:maestro.gru.occupied{maestro-scheduler:${scheduler},maestro-region:${region}}",
        "aggregator": "avg",
        "conditional_formats": [
          
        ],
        "type": "line",
        "style": {
          "palette": "cool"
        }
      },
      {
        "q": "max:maestro.gru.occupied{maestro-scheduler:${scheduler},maestro-region:${region}}",
        "style": {
          "palette": "warm"
        },
        "type": "line"
      }
    ],
    "autoscale": true
  }`

const cacheKey = (scheduler, region) => `${scheduler}//${region}`

const requestEmbed = (scheduler, region) => {
  const host = 'https://app.datadoghq.com/api/v1/graph/embed'

  return request
    .post(host)
    .form({
      api_key: process.env.DATADOG_API_KEY,
      application_key: process.env.DATADOG_APPLICATION_KEY,
      graph_json: graphDef(scheduler, region),
      size: 'small',
      timeframe: '1_hour',
      title: 'Occupancy'
    })
    .then(response => ({
      embedId: JSON.parse(response).embed_id
    }))
}

const maybeRequest = (scheduler, region) => {
  const key = cacheKey(scheduler, region)
  const cached = cache.get(key)

  if (cached) {
    return Promise.resolve(cached)
  }

  return requestEmbed(scheduler, region).then(json => {
    cache.put(key, json, 1000 * 60 * 60)
    return json
  })
}

module.exports = app =>
  app.get('/graph', function (req, res, next) {
    const { scheduler, region } = req.query
    maybeRequest(scheduler, region).then(json => res.json(json))
  })

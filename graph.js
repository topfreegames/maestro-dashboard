const cache = require('memory-cache')
const request = require('request-promise')

const graphDef = ({ scheduler, region, upUsage, downUsage }) =>
  `{
    "viz": "timeseries",
    "status": "done",
    "requests": [
      {
        "q": "max:maestro.gru.ready{maestro-scheduler:${scheduler},maestro-region:${region}} + max:maestro.gru.occupied{maestro-scheduler:${scheduler},maestro-region:${region}}",
        "aggregator": "avg",
        "conditional_formats": [],
        "type": "line",
        "style": {
          "palette": "cool"
        }
      },
      {
        "q": "${upUsage / 100} * ( max:maestro.gru.ready{maestro-scheduler:${scheduler},maestro-region:${region}} + max:maestro.gru.occupied{maestro-scheduler:${scheduler},maestro-region:${region}} )",
        "aggregator": "avg",
        "conditional_formats": [],
        "type": "line",
        "style": {
          "palette": "dog_classic",
          "type": "dashed",
          "width": "thin"
        }
      },
      {
        "q": "${downUsage / 100} * ( max:maestro.gru.ready{maestro-scheduler:${scheduler},maestro-region:${region}} + max:maestro.gru.occupied{maestro-scheduler:${scheduler},maestro-region:${region}} )",
        "aggregator": "avg",
        "conditional_formats": [],
        "type": "line",
        "style": {
          "palette": "grey",
          "type": "dotted",
          "width": "thin"
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

const cacheKey = ({ scheduler, region, timeframe }) => `${scheduler}//${region}//${timeframe}`

const requestEmbed = argsObj => {
  const host = 'https://app.datadoghq.com/api/v1/graph/embed'

  return request
    .post(host)
    .form({
      api_key: process.env.DATADOG_API_KEY,
      application_key: process.env.DATADOG_APPLICATION_KEY,
      graph_json: graphDef(argsObj),
      size: 'small',
      timeframe: argsObj.timeframe,
      title: 'Occupancy'
    })
    .then(response => ({
      embedId: JSON.parse(response).embed_id
    }))
}

const maybeRequest = argsObj => {
  const key = cacheKey(argsObj)
  const cached = cache.get(key)

  if (cached) {
    return Promise.resolve(cached)
  }

  return requestEmbed(argsObj).then(json => {
    cache.put(key, json, 1000 * 60 * 60)
    return json
  })
}

module.exports = app =>
  app.get('/graph', function (req, res, next) {
    maybeRequest(req.query).then(json => res.json(json))
  })

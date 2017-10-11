const cache = require('memory-cache')
const axios = require('axios')

const credentials = () => {
  const apiKey = process.env.DATADOG_API_KEY
  const applicationKey = process.env.DATADOG_APPLICATION_KEY
  return `api_key=${apiKey}&application_key=${applicationKey}`
}

const graphDef = (scheduler, region) => `%7B%22viz%22%3A%22timeseries%22%2C%22status%22%3A%22done%22%2C%22requests%22%3A%5B%7B%22q%22%3A%22max%3Amaestro.gru.ready%7Bscheduler%3A${scheduler}%2Cregion%3A${region}%7D+%2B+max%3Amaestro.gru.occupied%7Bscheduler%3A${scheduler}%2Cregion%3A${region}%7D%22%2C%22aggregator%22%3A%22avg%22%2C%22conditional_formats%22%3A%5B%5D%2C%22type%22%3A%22line%22%2C%22style%22%3A%7B%22palette%22%3A%22cool%22%7D%7D%2C%7B%22q%22%3A%22max%3Amaestro.gru.occupied%7Bscheduler%3A${scheduler}%2Cregion%3A${region}%7D%22%2C%22style%22%3A%7B%22palette%22%3A%22warm%22%7D%2C%22type%22%3A%22line%22%7D%5D%2C%22autoscale%22%3Atrue%7D`

const delay = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

const maybeRequest = (scheduler, region) => {
  const host = 'https://app.datadoghq.com/api/v1/graph/snapshot'
  const end = Math.round((new Date()).getTime() / 1000)
  const start = end - 60 * 60

  const fromCache = cache.get(scheduler)
  console.log('fromCache', fromCache)

  if (fromCache) {
    return Promise.resolve(fromCache)
  } else {
    const url =
      `${host}?${credentials()}&start=${start}&end=${end}&graph_def=${graphDef(scheduler, region)}&title=Occupancy`

    return axios.get(url)
      .then(response => {
        cache.put(scheduler, response.data, 60000, key => console.log(key + ' expired'))
        return delay(7500).then(() => response.data)
      })
      .catch(error => console.log(error))
  }
}

module.exports = app =>
  app.get('/graph', function (req, res, next) {
    const { scheduler, region } = req.query
    maybeRequest('tanks-green-f-con', 'ap').then(json => res.json(json))
  })

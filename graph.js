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

const maxInterval = 1000 * 60 * 5
const pollingInterval = 1000 * 30
const delayInterval = 1000 * 9

const timeNow = () => (new Date()).getTime()
const timeInSec = time => Math.round(time / 1000)

const cacheKey = (scheduler, region) => `${scheduler}//${region}`

const snapshotRequest = (scheduler, region) => {
  const host = 'https://app.datadoghq.com/api/v1/graph/snapshot'
  const end = timeNow()
  const start = end - 60 * 60 * 1000

  const url =
    `${host}?${credentials()}&start=${timeInSec(start)}&end=${timeInSec(end)}&graph_def=${graphDef(scheduler, region)}&title=Occupancy`

  return axios.get(url)
    .then(response => ({
      snapshot: response.data.snapshot_url,
      lastRequestAt: end
    }))
}

const startPollingSnapshot = (scheduler, region) => {
  const key = cacheKey(scheduler, region)
  const cached = cache.get(key)

  if (cached && (timeNow() - cached.lastRequestAt > maxInterval)) return

  setTimeout(() => startPollingSnapshot(scheduler, region), pollingInterval)

  return snapshotRequest(scheduler, region)
    .then(({ snapshot, lastRequestAt }) => {
      cache.put(key, {
        snapshot,
        lastRequestAt,
        createdAt: lastRequestAt,
        schedulerName: scheduler,
        schedulerRegion: region
      })

      return snapshot
    })
    .catch(err => console.log(err))
}

const maybeRequest = (scheduler, region) => {
  const key = cacheKey(scheduler, region)
  const cached = cache.get(key)

  if (cached) {
    cache.put(key, {
      ...cached,
      lastRequestAt: timeNow()
    })

    if (timeNow() - cached.createdAt < delayInterval) {
      return delay(delayInterval - (cached.lastRequestAt - cached.createdAt))
        .then(() => cached.snapshot)
    }

    return Promise.resolve(cached.snapshot)
  }

  return startPollingSnapshot(scheduler, region).then(snapshot => {
    return delay(delayInterval).then(() => snapshot)
  })
}

module.exports = app =>
  app.get('/graph', function (req, res, next) {
    const { scheduler, region } = req.query
    maybeRequest(scheduler, region).then(snapshot => res.json({ snapshot }))
  })

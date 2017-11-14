import store from 'reducers'
import history from 'constants/history'

export const client = {}

client.host = cluster => {
  if (cluster) return cluster.host

  const clusters = store.getState().clusters
  return clusters[clusters.current].host
}

client.headers = cluster => {
  const state = store.getState()
  const token = ((cluster && cluster.token) || state.session.token)

  return {
    'Authorization': `Bearer ${token}`
  }
}

client.makeFetchOpts = (method, { payload, cluster }) => {
  const opts = {
    method,
    headers: client.headers(cluster)
  }

  if (payload) opts.body = JSON.stringify(payload)

  return opts
}

client.fetch = async (method, endpoint, { payload, cluster } = {}) => {
  try {
    const resolve = await fetch(
      `${client.host(cluster)}/${endpoint}`,
      client.makeFetchOpts(method, { payload, cluster })
    )
    return resolve
  } catch (err) {
    return { status: 400 }
  }
}

client.get = async (endpoint, cluster) =>
  client.fetch('GET', endpoint, { cluster })

client.put = async (endpoint, payload) =>
  client.fetch('PUT', endpoint, { payload })

client.post = async (endpoint, payload) =>
  client.fetch('POST', endpoint, { payload })

client.delete = async (endpoint) =>
  client.fetch('DELETE', endpoint)

export const navigate = (path, { isExternal } = {}) => {
  if (isExternal) {
    window.location = path
  } else {
    history.push(path)
  }
}

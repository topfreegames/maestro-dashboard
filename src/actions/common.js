import store from 'reducers'
import history from 'constants/history'

export const client = {}

client.base = window.localStorage.getItem('maestro:client')
client.set = host => window.localStorage.setItem('maestro:client', host)

client.headers = () => {
  const state = store.getState()
  return {
    'Authorization': `Bearer ${state.session && state.session.token}`
  }
}

client.makeFetchOpts = (method, payload) => {
  const opts = {
    method,
    headers: client.headers()
  }

  if (payload) opts.body = JSON.stringify(payload)

  return opts
}

const timeout = time =>
  new Promise((resolve) => setTimeout(resolve, time, { status: 400 }))

client.fetch = async (method, endpoint, payload) => {
  try {
    const resolve = await Promise.race([
      timeout(30000),
      fetch(`${client.base}/${endpoint}`,
        client.makeFetchOpts(method, payload))
    ])
    return resolve
  } catch (err) {
    return { status: 400 }
  }
}

client.get = async endpoint =>
  client.fetch('GET', endpoint)

client.put = async (endpoint, payload) =>
  client.fetch('PUT', endpoint, payload)

client.post = async (endpoint, payload) =>
  client.fetch('POST', endpoint, payload)

client.delete = async (endpoint) =>
  client.fetch('DELETE', endpoint)

export const navigate = (path, { isExternal } = {}) => {
  if (isExternal) {
    window.location = path
  } else {
    history.push(path)
  }
}

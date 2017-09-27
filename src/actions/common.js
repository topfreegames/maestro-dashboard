import store from 'reducers'
import history from 'constants/history'

export const client = {}

client.base = process.env.MAESTRO_URL

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

client.fetch = async (method, endpoint, payload) =>
  fetch(`${client.base}/${endpoint}`,
    client.makeFetchOpts(method, payload))

client.get = async endpoint =>
  client.fetch('GET', endpoint)

client.put = async (endpoint, payload) =>
  client.fetch('PUT', endpoint, payload)

client.post = async (endpoint, payload) =>
  client.fetch('POST', endpoint, payload)

export const back = () => history.go(-1)

import store from 'reducers'

export const client = {}

client.base = process.env.MAESTRO_URL

client.headers = () => {
  const state = store.getState()
  return {
    'Authorization': `Bearer ${state.session && state.session.token}`
  }
}

client.fetch = async (method, endpoint) =>
  fetch(`${client.base}/${endpoint}`, {
    method,
    headers: client.headers()
  })

client.get = async endpoint =>
  client.fetch('GET', endpoint)

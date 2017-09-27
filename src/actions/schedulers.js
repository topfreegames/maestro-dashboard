import YAML from 'yamljs'
import actions from 'constants/actions'
import { client } from './common'

const getSchedulerConfig = async scheduler => {
  const response = await client.get(`scheduler/${scheduler}?config`)
  if (response.status !== 200) return {}
  const json = await response.json()
  return YAML.parse(json.yaml)
}

const getSchedulerStatus = async scheduler => {
  const response = await client.get(`scheduler/${scheduler}`)
  if (response.status !== 200) return {}
  const json = await response.json()
  return json
}

export const getSchedulers = () => {
  return async dispatch => {
    dispatch({ type: actions.schedulers.indexFetch })

    const response = await client.get('scheduler')
    if (response.status !== 200) throw new Error('bad request')
    const json = await response.json()

    const schedulers = await Promise.all(json.schedulers.map(async s => {
      const config = await getSchedulerConfig(s)
      config.status = await getSchedulerStatus(s)
      return config
    }))

    dispatch({ type: actions.schedulers.indexFetchSuccess, schedulers })
  }
}

export const getScheduler = name => {
  return async dispatch => {
    dispatch({ type: actions.schedulers.showFetch, name })

    const config = await getSchedulerConfig(name)
    config.status = await getSchedulerStatus(name)

    dispatch({ type: actions.schedulers.showFetchSuccess, scheduler: config })
  }
}

const updateSchedulerMinimum = async (name, payload) => {
  const response = await client.put(`scheduler/${name}/min`, {
    min: payload.newMinimum
  })
  console.log(response)
  console.log(await response.json())
}

const updateSchedulerReplicas = async (name, payload) => {
  const response = await client.post(`scheduler/${name}`, {
    replicas: payload.replicas
  })
  console.log(response)
  console.log(await response.json())
}

const sleep = time =>
  new Promise((resolve) => setTimeout(resolve, time))

export const updateSchedulerMinimumAndReplicas = async (name, payload) => {
  if (payload.newMinimum) updateSchedulerMinimum(name, payload)
  if (payload.replicas) updateSchedulerReplicas(name, payload)

  await sleep(1200)
}

export const updateScheduler = async(payload) => {
  const response = await client.put(`scheduler/${payload.name}?maxsurge=25`, payload)
  console.log(response)
  console.log(await response.json())
}

export const createScheduler = async(payload) => {
  const response = await client.post('scheduler', payload)
  console.log(response)
  console.log(await response.json())
}

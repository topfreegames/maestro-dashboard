import YAML from 'js-yaml'
import actions from 'constants/actions'
import { client } from './common'

export const getSchedulerConfigYaml = async scheduler => {
  const response = await client.get(`scheduler/${scheduler}?config`)
  if (response.status !== 200) return {}
  const json = await response.json()
  return json.yaml
}

const getSchedulerConfig = async scheduler => {
  const yaml = await getSchedulerConfigYaml(scheduler)
  return YAML.safeLoad(yaml)
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
  if (response.status !== 200) throw new Error('bad request')
}

const updateSchedulerReplicas = async (name, payload) => {
  const response = await client.post(`scheduler/${name}`, {
    replicas: payload.replicas
  })
  if (response.status !== 200) throw new Error('bad request')
}

export const updateSchedulerMinimumAndReplicas = async (name, payload) => {
  try {
    if (payload.newMinimum) await updateSchedulerMinimum(name, payload)
    if (payload.replicas) await updateSchedulerReplicas(name, payload)
    return { status: 200 }
  } catch (err) {
    return { status: 400 }
  }
}

const removeEmptyFields = payload =>
  Object.keys(payload).reduce((acc, key) => {
    if (payload[key] === null ||
      payload[key] === undefined ||
      payload[key] === '') {
      return acc
    } else {
      return {
        ...acc,
        [key]: payload[key]
      }
    }
  }, {})

const updateSchedulerCommon = (name, payload) =>
  client.put(`scheduler/${name}?maxsurge=25`, payload)

export const updateScheduler = payload => {
  const normalizedPayload = removeEmptyFields(payload)
  return updateSchedulerCommon(payload.name, normalizedPayload)
}

export const updateSchedulerYaml = (name, yaml) => {
  return updateSchedulerCommon(name, YAML.safeLoad(yaml))
}

export const createScheduler = async payload => {
  return client.post('scheduler', payload)
}

export const deleteScheduler = async name => {
  return client.delete(`scheduler/${name}`)
}

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

export const getSchedulers = cluster => {
  return async dispatch => {
    dispatch({ type: actions.schedulers.indexFetch, cluster: cluster.name })

    const response = await client.get('scheduler?info', cluster)
    if (response.status !== 200) throw new Error('bad request')
    const schedulers = await response.json()
    const schedulersWithRegion =
      schedulers.map(s => ({ ...s, region: cluster.region }))

    dispatch({
      type: actions.schedulers.indexFetchSuccess,
      cluster: cluster.name,
      schedulers: schedulersWithRegion
    })
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

const removeEmptyFields = payload => {
  const removeFromArray = payload => {
    const filtered = payload.filter(x => {
      if (x === null || x === undefined || x === '') {
        return false
      } else if (typeof x === 'object') {
        if ((Array.isArray(x) && x.length === 0) ||
          Object.keys(x).length === 0) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    })

    return filtered.map(x => removeEmptyFields(x))
  }

  const removeFromObject = payload =>
    Object.keys(payload).reduce((acc, key) => {
      if (payload[key] === null ||
        payload[key] === undefined ||
        payload[key] === '') {
        return acc
      } else if (typeof payload[key] === 'object') {
        if (Array.isArray(payload[key])) {
          return {
            ...acc,
            [key]: removeFromArray(payload[key])
          }
        } else {
          return {
            ...acc,
            [key]: removeFromObject(payload[key])
          }
        }
      } else {
        return {
          ...acc,
          [key]: payload[key]
        }
      }
    }, {})

  if (typeof payload === 'object') {
    if (Array.isArray(payload)) {
      return removeFromArray(payload)
    } else {
      return removeFromObject(payload)
    }
  } else {
    return payload
  }
}

const updateSchedulerCommon = (name, payload) =>
  client.put(`scheduler/${name}?maxsurge=25`, payload)

export const updateScheduler = payload => {
  const normalizedPayload = removeEmptyFields(payload)
  return updateSchedulerCommon(payload.name, normalizedPayload)
}

export const createScheduler = payload => {
  const normalizedPayload = removeEmptyFields(payload)
  console.log(payload)
  console.log(normalizedPayload)
  return client.post('scheduler', normalizedPayload)
}

export const deleteScheduler = name => {
  return client.delete(`scheduler/${name}`)
}

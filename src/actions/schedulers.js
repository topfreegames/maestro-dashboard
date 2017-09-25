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

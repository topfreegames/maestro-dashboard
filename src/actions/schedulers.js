import YAML from 'yamljs'
import actions from 'constants/actions'
import { client } from './common'

export const getSchedulers = () => {
  return async dispatch => {
    dispatch({ type: actions.schedulers.indexFetch })

    const response = await client.get('scheduler')
    if (response.status !== 200) throw new Error('bad request')
    const json = await response.json()

    const schedulers = await Promise.all(json.schedulers.map(async s => {
      const response = await client.get(`scheduler/${s}?config`)
      if (response.status !== 200) return {}
      const json = await response.json()
      return YAML.parse(json.yaml)
    }))

    dispatch({ type: actions.schedulers.indexFetchSuccess, schedulers })
  }
}

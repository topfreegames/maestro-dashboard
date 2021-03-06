import { navigate } from 'actions/common'
import store from 'reducers/index'

export const randomString =
  (length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    let result = ''
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }

export const reduceRoomsStatuses = status => {
  const statuses = ['Creating', 'Occupied', 'Ready', 'Terminating']
  return statuses.reduce((acc, x) => acc + status[`roomsAt${x}`], 0)
}

export const signOut = () => {
  store.dispatch({ type: 'PURGE' })
  window.localStorage.clear()
  navigate('/')
}

export const gamesFromSchedulers = schedulers =>
  (schedulers && schedulers
    .map(s => s.game)
    .filter((e, i, self) => (i === self.indexOf(e)))
  ) || []

export const getSchedulersFromState = (state, ownProps) => {
  const clusters = JSON.parse(process.env.CLUSTERS)

  if (ownProps.globalMode) {
    return clusters.reduce((acc, c) => (
      acc.concat((state.schedulers.index[c.name] &&
        state.schedulers.index[c.name].schedulers) || [])
    ), [])
  } else {
    const clusterPath = state.schedulers.index[state.clusters.current]
    return (clusterPath && clusterPath.schedulers)
  }
}

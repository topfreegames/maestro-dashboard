export const schedulers = {
  indexFetch: 'SCHEDULERS/INDEX_FETCH',
  indexFetchSuccess: 'SCHEDULERS/INDEX_FETCH_SUCCESS',
  indexFetchFailure: 'SCHEDULERS/INDEX_FETCH_FAILURE',
  showFetch: 'SCHEDULERS/SHOW_FETCH',
  showFetchSuccess: 'SCHEDULERS/SHOW_FETCH_SUCCESS',
  showFetchFailure: 'SCHEDULERS/SHOW_FETCH_FAILURE'
}

export const clusters = {
  createCluster: 'CLUSTERS/CREATE',
  createClusterSuccess: 'CLUSTERS/CREATE_SUCCESS',
  createClusterFailure: 'CLUSTERS/CREATE_FAILURE'
}

export const session = {
  setToken: 'SESSION/SET_TOKEN',
  setCode: 'SESSION/SET_CODE'
}

export default {
  schedulers,
  clusters,
  session
}

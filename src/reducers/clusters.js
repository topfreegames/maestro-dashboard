import clusters from 'constants/actions'

const clustersReducer = (state = {}, action) => {
  switch (action.type) {
    case clusters.createCluster:
      return {
        ...state,
        fetching: true,
        error: {}
      }
    case clusters.createClusterSuccess:
      return {
        ...state,
        clusters: [
          ...state.clusters,
          action.cluster
        ],
        fetching: false,
        error: {}
      }
    default:
      return state
  }
}

export default clustersReducer

import actions from 'constants/actions'
import { exchangeCode, getCode } from './session'
import { client } from './common'

export const exchangeCodeForCluster = (code, cluster) =>
  async dispatch => {
    const token = await exchangeCode(code, cluster.host)
    dispatch(selectClusterWithToken({ ...cluster, token }))
  }

const selectClusterWithToken = cluster =>
  (dispatch, getState) => {
    client.base = cluster.host

    dispatch({
      type: actions.session.setToken,
      token: cluster.token
    })

    dispatch({
      type: actions.clusters.selectSuccess,
      token: cluster.token
    })
  }

export const selectCluster = cluster =>
  (dispatch, getState) => {
    const { code } = getState().session
    const { clusters } = getState()

    dispatch({ type: actions.clusters.select, selecting: cluster })

    if (clusters[cluster.name]) {
      dispatch(selectClusterWithToken(clusters[cluster.name]))
    } else {
      if (code) dispatch(exchangeCodeForCluster(code, cluster))
      else getCode()
    }
  }

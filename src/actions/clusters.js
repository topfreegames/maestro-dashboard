import actions from 'constants/actions'
import { exchangeCode, getCode } from './session'
import snackbar from 'actions/snackbar'

export const exchangeCodeForCluster = (code, cluster) =>
  async dispatch => {
    try {
      const token = await exchangeCode(code, cluster.host)
      dispatch(selectClusterWithToken({ ...cluster, token }))
    } catch (err) {
      console.log(err.Error())
    }
  }

const selectClusterWithToken = cluster =>
  (dispatch, getState) => {
    dispatch({
      type: actions.session.setToken,
      token: cluster.token
    })

    dispatch({
      type: actions.clusters.selectSuccess,
      token: cluster.token
    })

    dispatch(
      snackbar.set({ text: `Cluster [${cluster.name}] selected` })
    )
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

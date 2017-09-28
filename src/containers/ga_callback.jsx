import React from 'react'
import { connect } from 'react-redux'
import { exchangeCodeForCluster } from 'actions/clusters'
import history from 'constants/history'
import actions from 'constants/actions'

class GACallback extends React.Component {
  componentDidMount = () => {
    const { code } = this.props.route.options
    this.props.dispatch({ type: actions.session.setCode, code })
  }

  componentDidUpdate = () => this.maybeRedirectToDashboard()

  maybeRedirectToDashboard = async () => {
    const { session, clusters, dispatch } = this.props

    if (session.code) {
      if (clusters.selecting) {
        await dispatch(exchangeCodeForCluster(session.code, clusters.selecting))
      }
      history.push('dashboard')
    }
  }

  render () {
    return <div />
  }
}

export default connect(state => ({
  clusters: state.clusters,
  session: state.session
}))(GACallback)

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import Header from 'components/common/header'
import Schedulers from 'containers/schedulers'
import Clusters from 'containers/clusters'
import { navigate } from 'actions/common'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    const activeTab = this.props.session.token ? 'Schedulers' : 'Clusters'

    this.state = {
      activeTab
    }
  }

  switchTab = (event, tab) => {
    event.preventDefault()

    if (!this.props.session.token) return

    this.setState({
      ...this.state,
      activeTab: tab
    })
  }

  headerTitle = () => (
    <div {...headerStyles}>
      Maestro {this.props.cluster.name}
      <button onClick={() => navigate('schedulers/new')}>create</button>
      <button onClick={() => this.props.dispatch({ type: 'PURGE' })}>sign-out</button>
    </div>
  )

  render = () => {
    const { activeTab } = this.state

    return (
      <div {...Dashboard.styles}>
        <Header title={this.headerTitle()} switchTab={this.switchTab} activeTab={activeTab} />
        {activeTab === 'Schedulers' && <Schedulers />}
        {activeTab === 'Clusters' && <Clusters />}
      </div>
    )
  }
}

const headerStyles = css({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between'
})

Dashboard.styles = css({
  '> div:nth-of-type(2)': {
    display: 'flex',
    width: '100%'
  }
})

export default connect(state => ({
  cluster: (state.clusters.current && state.clusters[state.clusters.current]) ||
  {},
  session: state.session
}))(Dashboard)

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import Header from 'components/common/header'
import Schedulers from 'containers/dashboard/schedulers'
import Clusters from 'components/dashboard/clusters'
import { client } from 'actions/common'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTab: 'schedulers'
    }
  }

  switchTab = (event, tab) => {
    event.preventDefault()

    this.setState({
      ...this.state,
      activeTab: tab
    })
  }

  render = () => {
    const { activeTab } = this.state

    return (
      <div {...Dashboard.styles}>
        <Header switchTab={this.switchTab} activeTab={activeTab} />
        {activeTab === 'schedulers' && <Schedulers />}
        {activeTab === 'clusters' && <Clusters />}
      </div>
    )
  }
}

Dashboard.styles = css({
  '> div:nth-of-type(2)': {
    display: 'flex',
    width: '100%'
  }
})

export default connect(state => ({
  session: state.session
}))(Dashboard)
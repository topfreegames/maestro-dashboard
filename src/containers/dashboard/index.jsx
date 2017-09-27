import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import Header from 'components/common/header'
import Schedulers from 'containers/dashboard/schedulers'
import Clusters from 'components/dashboard/clusters'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTab: 'Schedulers'
    }
  }

  switchTab = (event, tab) => {
    event.preventDefault()

    this.setState({
      ...this.state,
      activeTab: tab
    })
  }

  headerTitle = () => (
    <div {...headerStyles}>
      Maestro
      <button onClick={() => (window.location = 'schedulers/new')}>create</button>
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
  session: state.session
}))(Dashboard)

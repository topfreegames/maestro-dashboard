import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import Header from 'components/common/header'
import Schedulers from 'containers/schedulers'
import Clusters from 'containers/clusters'
import styles from 'constants/styles'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    const activeTab = this.props.session.token ? 'Schedulers' : 'Clusters'

    this.state = {
      activeTab
    }
  }

  switchTab = (event, tab) => {
    event && event.preventDefault()

    if (!this.props.session.token) return

    this.setState({
      ...this.state,
      activeTab: tab
    })
  }

  switchToSchedulers = () => this.switchTab(null, 'Schedulers')

  headerLeft = () => (
    <div {...headerLeftStyles}>M</div>
  )

  headerRight = () => (
    <i className='fa fa-search' aria-hidden='true' {...headerRightStyles} />
  )

  render = () => {
    const { activeTab } = this.state

    return (
      <div {...Dashboard.styles}>
        <Header
          left={this.headerLeft()}
          title={this.props.cluster.name}
          right={this.headerRight()}
          tabs={['Clusters', 'Schedulers']}
          switchTab={this.switchTab}
          activeTab={activeTab}
        />
        {activeTab === 'Schedulers' && <Schedulers />}
        {activeTab === 'Clusters' &&
          <Clusters switchToSchedulers={this.switchToSchedulers} />}
      </div>
    )
  }
}

const headerLeftStyles = css({
  color: styles.colors.brandPrimary,
  fontWeight: 700,
  fontSize: styles.fontSizes['6']
})

const headerRightStyles = css({
  color: styles.colors.gray_75
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

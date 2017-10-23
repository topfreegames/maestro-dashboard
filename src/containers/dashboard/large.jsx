import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { Large } from 'components/common/responsive'
import { AddButton } from 'components/common'
import Header from './large/header'
import Schedulers from 'containers/schedulers'
import styles from 'constants/styles'
import { navigate } from 'actions/common'

const newScheduler = event => {
  event.preventDefault()
  navigate('/schedulers/new')
}

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tvTimeframe: '1_hour',
      tvMode: false,
      gameFilter: '',
      schedulerFilter: ''
    }
  }

  toggleTvMode = e => this.setState({ tvMode: !this.state.tvMode })
  changeTvTimeframe = tvTimeframe => this.setState({ tvTimeframe })
  handleChange = e => this.setState({ [e.target.id]: e.target.value })

  componentWillReceiveProps = nextProps => {
    if (nextProps.cluster && this.props.cluster &&
      nextProps.cluster.name !== this.props.cluster.name) {
      this.setState({
        gameFilter: '',
        schedulerFilter: ''
      })
    }
  }

  render = () => (
    <Large>
      <div {...Dashboard.styles}>
        <Header
          activeTimeframe={this.state.tvTimeframe}
          changeTimeframe={this.changeTvTimeframe}
          tvMode={this.state.tvMode}
          toggleTvMode={this.toggleTvMode}
          schedulerFilter={this.state.schedulerFilter}
          gameFilter={this.state.gameFilter}
          handleChange={this.handleChange}
        />
        <Schedulers
          activeTimeframe={this.state.tvTimeframe}
          tvMode={this.state.tvMode}
          schedulerFilter={this.state.schedulerFilter}
          gameFilter={this.state.gameFilter}
        />
        <AddButton handleClick={newScheduler} />
      </div>
    </Large>
  )
}

Dashboard.styles = css({
  '> .filters': {
    display: 'flex',
    flexDirection: 'row',
    margin: '24px',
    marginBottom: 0,
    padding: '16px',
    backgroundColor: styles.colors.background,
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.2)',

    '> * + *': { marginLeft: '30px' }
  }
})

export default connect(state => ({
  cluster: (state.clusters.current && state.clusters[state.clusters.current]) ||
  {},
}))(Dashboard)

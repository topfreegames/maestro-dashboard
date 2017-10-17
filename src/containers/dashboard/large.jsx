import React from 'react'
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
      tvMode: false,
      gameFilter: '',
      schedulerFilter: ''
    }
  }

  toggleTvMode = e => this.setState({ tvMode: !this.state.tvMode })
  handleChange = e => this.setState({ [e.target.id]: e.target.value })

  render = () => (
    <Large>
      <div {...Dashboard.styles}>
        <Header
          toggleTvMode={this.toggleTvMode}
          schedulerFilter={this.state.schedulerFilter}
          gameFilter={this.state.gameFilter}
          handleChange={this.handleChange}
        />
        <Schedulers
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

export default Dashboard

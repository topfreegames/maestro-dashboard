import React from 'react'
import { css } from 'glamor'
import { Large } from 'components/common/responsive'
import { AddButton } from 'components/common'
import Header from './large/header'
import Schedulers from 'containers/schedulers'
import styles from 'constants/styles'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gameFilter: '',
      schedulerFilter: ''
    }
  }

  handleChange = e => this.setState({ [e.target.id]: e.target.value })

  render = () => (
    <Large>
      <div {...Dashboard.styles}>
        <Header
          schedulerFilter={this.state.schedulerFilter}
          gameFilter={this.state.gameFilter}
          handleChange={this.handleChange}
        />
        <Schedulers
          schedulerFilter={this.state.schedulerFilter}
          gameFilter={this.state.gameFilter}
        />
        <AddButton />
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

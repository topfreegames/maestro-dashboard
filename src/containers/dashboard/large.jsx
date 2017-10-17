import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { Large } from 'components/common/responsive'
import { AddButton, AutoComplete, TextInput } from 'components/common'
import Header from './large/header'
import Schedulers from 'containers/schedulers'
import styles from 'constants/styles'
import { gamesFromSchedulers } from 'helpers/common'

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
        <Header />
        <div className='filters'>
          <AutoComplete
            id='gameFilter'
            label='Game Filter'
            options={this.props.schedulersGames}
            value={this.state.gameFilter}
            handleChange={this.handleChange}
            placeholder={'Filter by game'}
          />
          <TextInput
            id='schedulerFilter'
            label='Scheduler Filter'
            placeholder='Search schedulers'
            value={this.state.schedulerFilter}
            handleChange={this.handleChange}
          />
        </div>
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

export default connect(state => ({
  schedulersGames: gamesFromSchedulers(state.schedulers.index.schedulers)
}))(Dashboard)

import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { Large } from 'components/common/responsive'
import { AddButton, AutoComplete } from 'components/common'
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

  handleGameFilterChange = e => this.setState({ gameFilter: e.target.value })

  render = () => (
    <Large>
      <div {...Dashboard.styles}>
        <Header />
        <div className='filters'>
          <AutoComplete
            options={this.props.schedulersGames}
            value={this.state.gameFilter}
            handleChange={this.handleGameFilterChange}
            placeholder={'Filter by game'}
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
    padding: '24px'
  }
})

export default connect(state => ({
  schedulersGames: (state.schedulers.index.schedulers &&
    state.schedulers.index.schedulers
    .map(s => s.game)
    .filter((e, i, self) => (i === self.indexOf(e)))
  ) || ''
}))(Dashboard)

import React from 'react'
import { connect } from 'react-redux'
import fuzzy from 'fuzzy'
import SchedulersComponent from 'components/schedulers'
import { getSchedulers } from 'actions/schedulers'

const sortSchedulers = schedulers =>
  schedulers.sort((a, b) => a.name < b.name ? -1 : 1)

class Schedulers extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gameFilter: ''
    }
  }

  handleGameFilterChange = e => this.setState({ gameFilter: e.target.value })

  componentDidMount = async () => {
    this.props.dispatch(getSchedulers())
  }

  applyFilter = (filter, field, schedulers) =>
    fuzzy
      .filter(filter, schedulers, {
        extract: el => el[field]
      })
      .map(el => el.original)

  render = () => (
    <SchedulersComponent
      filter={this.props.filter}
      gameFilter={this.state.gameFilter}
      handleGameFilterChange={this.handleGameFilterChange}
      schedulers={
        sortSchedulers(
          this.applyFilter(this.props.filter, 'name',
            this.applyFilter(this.state.gameFilter, 'game', this.props.schedulers)
          )
        )
      }
      gameFilterOptions={
        this.props.schedulers
          .map(s => s.game)
          .filter((e, i, self) => (i === self.indexOf(e)))
      }
      fetching={this.props.fetching}
    />
  )
}

export default connect(state => ({
  schedulers: state.schedulers.index.schedulers,
  fetching: state.schedulers.index.fetching
}))(Schedulers)

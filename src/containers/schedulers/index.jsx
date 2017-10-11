import React from 'react'
import { connect } from 'react-redux'
import fuzzy from 'fuzzy'
import SchedulersComponent from 'components/schedulers'
import { getSchedulers } from 'actions/schedulers'

const sortSchedulers = schedulers =>
  schedulers.sort((a, b) => a.name < b.name ? -1 : 1)

class Schedulers extends React.Component {
  componentDidMount = async () => {
    this.props.dispatch(getSchedulers())
  }

  applyFilter = field =>
    fuzzy
      .filter(this.props.filter, this.props.schedulers, {
        extract: el => el[field]
      })
      .map(el => el.original)

  render = () => (
    <SchedulersComponent
      filter={this.props.filter}
      schedulers={
        sortSchedulers(
          [...this.applyFilter('name'), ...this.applyFilter('game')]
          .filter((e, i, self) => (i === self.indexOf(e)))
        )
      }
      fetching={this.props.fetching}
    />
  )
}

export default connect(state => ({
  schedulers: state.schedulers.index.schedulers,
  fetching: state.schedulers.index.fetching
}))(Schedulers)

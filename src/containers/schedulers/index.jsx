import React from 'react'
import { connect } from 'react-redux'
import fuzzy from 'fuzzy'
import SchedulersComponent from 'components/schedulers'
import { getSchedulers } from 'actions/schedulers'

class Schedulers extends React.Component {
  componentDidMount = async () => {
    this.props.dispatch(getSchedulers())
  }

  applyFilter = () =>
    fuzzy
      .filter(this.props.filter, this.props.schedulers, {
        extract: el => el.name
      })
      .map(el => el.original)

  render = () => (
    <SchedulersComponent
      filter={this.props.filter}
      schedulers={this.applyFilter()}
      fetching={this.props.fetching}
    />
  )
}

const sortSchedulers = schedulers =>
  schedulers.sort((a, b) => a.name < b.name ? -1 : 1)

export default connect(state => ({
  schedulers: sortSchedulers(state.schedulers.index.schedulers),
  fetching: state.schedulers.index.fetching
}))(Schedulers)

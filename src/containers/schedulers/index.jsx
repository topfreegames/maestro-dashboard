import React from 'react'
import { connect } from 'react-redux'
import fuzzy from 'fuzzy'
import SchedulersComponent from 'components/schedulers'
import { getSchedulers } from 'actions/schedulers'
import { reduceRoomsStatuses } from 'helpers/common'
import ReactTimeout from 'react-timeout'

const sortSchedulers = schedulers =>
  schedulers
    .sort((a, b) => {
      return reduceRoomsStatuses(a.status) < reduceRoomsStatuses(b.status) ? 1 : -1
    })

class Schedulers extends React.Component {
  doGetSchedulers = () => this.props.dispatch(getSchedulers())

  updateSchedulersLoop = () => {
    if (this.props.cluster) this.doGetSchedulers()
    this.props.setTimeout(() => this.updateSchedulersLoop(), 1000 * 60)
  }

  componentDidMount = () => this.updateSchedulersLoop()

  componentWillReceiveProps = nextProps => {
    if (!this.props.cluster && nextProps.cluster) {
      this.doGetSchedulers()
    } else if (this.props.cluster && nextProps.cluster &&
      nextProps.cluster.name !== this.props.cluster.name) {
      this.doGetSchedulers()
    }
  }

  applyFilter = (filter, field, schedulers) =>
    fuzzy
      .filter(filter, schedulers, {
        extract: el => el[field]
      })
      .map(el => el.original)

  render = () => (
    <SchedulersComponent
      activeTimeframe={this.props.activeTimeframe}
      tvMode={this.props.tvMode}
      schedulerFilter={this.props.schedulerFilter}
      schedulers={
        sortSchedulers(
          this.applyFilter(this.props.schedulerFilter, 'name',
            this.applyFilter(this.props.gameFilter, 'game', this.props.schedulers)
          )
        )
      }
      fetching={this.props.fetching}
    />
  )
}

export default connect(state => ({
  cluster: state.clusters[state.clusters.current],
  schedulers: state.schedulers.index.schedulers,
  fetching: state.schedulers.index.fetching
}))(ReactTimeout(Schedulers))

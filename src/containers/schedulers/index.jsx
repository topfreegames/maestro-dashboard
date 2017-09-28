import React from 'react'
import { connect } from 'react-redux'
import SchedulersComponent from 'components/schedulers'
import { getSchedulers } from 'actions/schedulers'

class Schedulers extends React.Component {
  componentDidMount = async () => {
    this.props.dispatch(getSchedulers())
  }

  render = () => (
    <SchedulersComponent
      schedulers={this.props.schedulers}
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

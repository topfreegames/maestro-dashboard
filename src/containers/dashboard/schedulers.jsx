import React from 'react'
import { connect } from 'react-redux'
import SchedulersComponent from 'components/dashboard/schedulers'
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

export default connect(state => ({
  schedulers: state.schedulers.index.schedulers,
  fetching: state.schedulers.index.fetching
}))(Schedulers)

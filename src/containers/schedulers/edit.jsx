import React from 'react'
import { connect } from 'react-redux'
import SchedulersEditComponent from 'components/schedulers/edit'
import { getScheduler, updateScheduler } from 'actions/schedulers'

class SchedulersEdit extends React.Component {
  componentDidMount = async () => {
    this.props.dispatch(getScheduler(this.props.route.options.name))
  }

  handleSubmit = async scheduler => {
    await updateScheduler(scheduler)
  }

  render = () => (
    <SchedulersEditComponent
      scheduler={this.props}
      handleSubmit={this.handleSubmit}
    />
  )
}

export default connect((state, ownProps) => ({
  ...state.schedulers.show[ownProps.route.options.name]
}))(SchedulersEdit)

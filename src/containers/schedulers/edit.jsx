import React from 'react'
import { connect } from 'react-redux'
import { Button, BackButton } from 'components/common'
import Form from 'components/schedulers/form'
import { getScheduler, updateScheduler } from 'actions/schedulers'

const headerLeft = scheduler =>
  <div>
    <BackButton />
    <span>{scheduler && scheduler.name}</span>
  </div>

const headerRight = () => <Button variant='secondary' size='small'>Remove</Button>

class SchedulersEdit extends React.Component {
  componentDidMount = async () => {
    this.props.dispatch(getScheduler(this.props.route.options.name))
  }

  handleSubmit = async scheduler => {
    await updateScheduler(scheduler)
  }

  render = () => (
    <Form
      header={{
        left: headerLeft(this.props),
        right: headerRight()
      }}
      scheduler={this.props}
      handleSubmit={this.handleSubmit}
    />
  )
}

export default connect((state, ownProps) => ({
  ...state.schedulers.show[ownProps.route.options.name]
}))(SchedulersEdit)

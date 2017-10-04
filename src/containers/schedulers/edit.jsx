import React from 'react'
import { connect } from 'react-redux'
import { Button, BackButton } from 'components/common'
import Form from 'components/schedulers/form'
import { getScheduler, updateScheduler, deleteScheduler } from 'actions/schedulers'
import { navigate } from 'actions/common'

const headerLeft = scheduler =>
  <div>
    <BackButton />
    <span>{scheduler && scheduler.name}</span>
  </div>

const headerRight = handleClick =>
  <Button
    variant='secondary'
    size='small'
    handleClick={handleClick}
  >
    Delete
  </Button>

class SchedulersEdit extends React.Component {
  constructor () {
    super()

    this.state = {
      loading: false
    }
  }

  componentDidMount = async () => {
    this.props.dispatch(getScheduler(this.props.route.options.name))
  }

  toggleLoading = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    })
  }

  handleSubmit = async scheduler => {
    this.toggleLoading()
    await updateScheduler(scheduler)
    this.toggleLoading()
  }

  handleDeleteScheduler = async event => {
    event.preventDefault()
    this.toggleLoading()
    await deleteScheduler(this.props.name)
    navigate('/dashboard')
  }

  render = () => (
    <Form
      header={{
        left: headerLeft(this.props),
        right: headerRight(this.handleDeleteScheduler)
      }}
      loading={this.state.loading}
      scheduler={this.props}
      handleSubmit={this.handleSubmit}
    />
  )
}

export default connect((state, ownProps) => ({
  ...state.schedulers.show[ownProps.route.options.name]
}))(SchedulersEdit)

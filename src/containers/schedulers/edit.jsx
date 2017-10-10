import React from 'react'
import { connect } from 'react-redux'
import { Button, BackButton, Confirmation } from 'components/common'
import Form from 'components/schedulers/form'
import { getScheduler, updateScheduler, deleteScheduler } from 'actions/schedulers'
import { navigate } from 'actions/common'
import snackbar from 'helpers/snackbar'

const headerLeft = schedulerName =>
  <div>
    <BackButton />
    <span>{schedulerName}</span>
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
      showConfirmation: false,
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

    const res = await updateScheduler(scheduler)

    this.toggleLoading()

    snackbar.textFromBoolean(
      res.status > 199 && res.status < 300,
      {
        isTrue: `${this.props.scheduler.name} updated`,
        isFalse: `Error updating ${this.props.scheduler.name}`
      }
    )
  }

  handleDeleteScheduler = async event => {
    event.preventDefault()
    this.toggleLoading()

    const { name } = this.props.scheduler

    const res = await deleteScheduler(name)
    navigate('/dashboard')

    snackbar.textFromBoolean(
      res.status > 199 && res.status < 300,
      {
        isTrue: `${name} deleted`,
        isFalse: `Error deleting ${name}`
      }
    )
  }

  toggleConfirmation = event => {
    event.preventDefault()
    this.setState({ showConfirmation: !this.state.showConfirmation })
  }

  confirmation = () => (
    <Confirmation
      title='Delete Scheduler?'
      description={`
        ${this.props.scheduler.name} will be permanently deleted from 
        [${this.props.cluster}] cluster
      `}
      close={this.toggleConfirmation}
      actions={[
        { name: 'Cancel' },
        {
          name: 'Delete',
          func: e => this.handleDeleteScheduler(e)
        }
      ]}
    />
  )

  render = () => {
    return (
      <div>
        {this.state.showConfirmation && this.confirmation()}
        <Form
          header={{
            left: headerLeft(this.props.schedulerName),
            right: headerRight(this.toggleConfirmation)
          }}
          scheduler={this.props.scheduler}
          handleSubmit={this.handleSubmit}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  schedulerName: ownProps.route.options.name,
  scheduler: state.schedulers.show[ownProps.route.options.name],
  cluster: state.clusters.current
}))(SchedulersEdit)

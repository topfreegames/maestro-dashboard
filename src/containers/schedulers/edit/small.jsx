import React from 'react'
import { connect } from 'react-redux'
import { Button, BackButton, Confirmation } from 'components/common'
import Form from 'components/schedulers/form'
import { Small } from 'components/common/responsive'
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
      confirmationScreen: null,
      scheduler: null,
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

  toggleConfirmation = (confirmationScreen, scheduler) => {
    this.setState({
      confirmationScreen,
      scheduler
    })
  }

  deleteConfirmation = () => (
    <Confirmation
      title='Delete Scheduler?'
      description={`
        ${this.props.scheduler.name} will be permanently deleted from 
        [${this.props.cluster}] cluster
      `}
      close={() => this.toggleConfirmation()}
      actions={[
        { name: 'Cancel' },
        {
          name: 'Delete',
          func: e => this.handleDeleteScheduler(e)
        }
      ]}
    />
  )

  updateConfirmation = () => (
    <Confirmation
      title='Update Scheduler?'
      description={`
        ${this.props.scheduler.name} will be updated in
        [${this.props.cluster}] cluster
      `}
      close={() => this.toggleConfirmation()}
      actions={[
        { name: 'Cancel' },
        {
          name: 'Update',
          func: () => this.handleSubmit(this.state.scheduler)
        }
      ]}
    />
  )

  render = () => (
    <Small>
      {this.state.confirmationScreen && <this.state.confirmationScreen />}
      <Form
        header={{
          left: headerLeft(this.props.schedulerName),
          right: headerRight(
            () => this.toggleConfirmation(this.deleteConfirmation)
          )
        }}
        scheduler={this.props.scheduler}
        handleSubmit={scheduler =>
          this.toggleConfirmation(this.updateConfirmation, scheduler)
        }
        loading={this.state.loading}
      />
    </Small>
  )
}

export default connect((state, ownProps) => ({
  schedulerName: ownProps.route.options.name,
  scheduler: state.schedulers.show[ownProps.route.options.name],
  cluster: state.clusters.current
}))(SchedulersEdit)

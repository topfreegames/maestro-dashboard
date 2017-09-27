import React from 'react'
import SchedulerComponent from 'components/dashboard/scheduler'
import { updateSchedulerMinimumAndReplicas } from 'actions/schedulers'

class Scheduler extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      minimum: this.props.autoscaling.min,
      replicas: this.reduceRoomsStatuses(),
      fetching: false
    }
  }

  reduceRoomsStatuses = () => {
    const statuses = ['Creating', 'Occupied', 'Ready', 'Terminating']
    return statuses.reduce((acc, x) => acc + this.props.status[`roomsAt${x}`], 0)
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const updatePayload = {}

    const shouldUpdateMinimum =
      this.props.autoscaling.min !== this.state.minimum

    if (shouldUpdateMinimum) {
      updatePayload.newMinimum = parseInt(this.state.minimum)
    }

    const shouldUpdateReplicas =
      this.state.replicas !== this.reduceRoomsStatuses()

    if (shouldUpdateReplicas) {
      updatePayload.replicas = parseInt(this.state.replicas)
    }

    this.setState({
      ...this.state,
      fetching: true
    })

    await updateSchedulerMinimumAndReplicas(this.props.name, updatePayload)

    this.setState({
      ...this.state,
      fetching: false
    })
  }

  render = () => {
    return this.state.fetching
      ? <div>...</div>
      : <SchedulerComponent
        name={this.props.name}
        game={this.props.game}
        ready={this.props.status.roomsAtReady}
        occupied={this.props.status.roomsAtOccupied}
        minimum={this.state.minimum}
        replicas={this.state.replicas}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
  }
}

export default Scheduler

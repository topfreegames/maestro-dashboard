import React from 'react'
import SchedulerComponent from 'components/schedulers/scheduler'
import { updateSchedulerMinimumAndReplicas } from 'actions/schedulers'

class Scheduler extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      minimum: this.props.autoscaling.min,
      replicas: this.reduceRoomsStatuses(),
      showGraphs: false,
      fetching: false
    }
  }

  reduceRoomsStatuses = () => {
    const statuses = ['Creating', 'Occupied', 'Ready', 'Terminating']
    return statuses.reduce((acc, x) => acc + this.props.status[`roomsAt${x}`], 0)
  }

  toggleGraphs = event => {
    event.preventDefault()
    this.setState({
      ...this.state,
      showGraphs: !this.state.showGraphs
    })
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
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
    const ready = this.props.status.roomsAtReady
    const occupied = this.props.status.roomsAtOccupied
    const sum = ready + occupied
    const occupancy = sum > 0 ? occupied / sum : 0

    return (
      <SchedulerComponent
        name={this.props.name}
        game={this.props.game}
        ready={ready}
        occupied={occupied}
        occupancy={occupancy}
        threshold={this.props.autoscaling.up.trigger.threshold}
        minimum={this.state.minimum}
        replicas={this.state.replicas}
        showGraphs={this.state.showGraphs}
        fetching={this.state.fetching}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        toggleGraphs={this.toggleGraphs}
      />
    )
  }
}

export default Scheduler

import React from 'react'
import { connect } from 'react-redux'
import SchedulerComponent from 'components/schedulers/scheduler'
import { updateSchedulerMinimumAndReplicas } from 'actions/schedulers'
import { default as snackbarH } from 'helpers/snackbar'
import snackbar from 'actions/snackbar'

class Scheduler extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showGraph: false,
      fetching: false
    }
  }

  reduceRoomsStatuses = () => {
    const statuses = ['Creating', 'Occupied', 'Ready', 'Terminating']
    return statuses.reduce((acc, x) => acc + this.props[`rooms${x}`], 0)
  }

  toggleGraphs = event => {
    event.preventDefault()
    this.setState({ showGraph: !this.state.showGraph })
  }

  handleSubmit = async ({ minimum, replicas }) => {
    const updatePayload = {}

    const shouldUpdateMinimum =
      this.props.autoscaling.min !== minimum

    if (shouldUpdateMinimum) {
      updatePayload.newMinimum = parseInt(minimum)
    }

    const shouldUpdateReplicas =
      replicas !== this.reduceRoomsStatuses()

    if (shouldUpdateReplicas) {
      updatePayload.replicas = parseInt(replicas)
    }

    this.setState({ fetching: true })

    const res =
      await updateSchedulerMinimumAndReplicas(this.props.name, updatePayload)

    if (Object.entries(updatePayload).length === 0) {
      this.props.dispatch(
        snackbar.set({ text: `Nothing to update in ${this.props.name}` })
      )
    } else {
      snackbarH.textFromBoolean(
        res.status > 199 && res.status < 300,
        {
          isTrue: `${this.props.name} updated`,
          isFalse: `Error updating ${this.props.name}`
        }
      )
    }

    this.setState({ fetching: false })
  }

  render = () => {
    const ready = this.props.roomsReady
    const occupied = this.props.roomsOccupied
    const sum = ready + occupied
    const occupancy = sum > 0 ? occupied / sum : 0

    return (
      <SchedulerComponent
        name={this.props.name}
        state={this.props.state}
        game={this.props.game}
        ready={ready}
        occupied={occupied}
        occupancy={occupancy}
        threshold={80}
        minimum={this.props.autoscalingMin}
        replicas={this.reduceRoomsStatuses()}
        showGraph={this.state.showGraph}
        fetching={this.state.fetching}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        toggleGraphs={this.toggleGraphs}
        tvMode={this.props.tvMode}
        activeTimeframe={this.props.activeTimeframe}
        upUsage={this.props.autoscalingUpTriggerUsage}
        downUsage={this.props.autoscalingDownTriggerUsage}
      />
    )
  }
}

export default connect()(Scheduler)

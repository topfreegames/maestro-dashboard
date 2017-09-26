import React from 'react'
import SchedulerComponent from 'components/dashboard/scheduler'

class Scheduler extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      minimum: this.props.autoscaling.min,
      current: 4
    }
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  render = () => (
    <SchedulerComponent
      name={this.props.name}
      game={this.props.game}
      ready={this.props.status.roomsAtReady}
      occupied={this.props.status.roomsAtOccupied}
      minimum={this.state.minimum}
      current={this.state.current}
      handleChange={this.handleChange}
    />
  )
}

export default Scheduler

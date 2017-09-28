import React from 'react'
import { connect } from 'react-redux'
import { BackButton } from 'components/common'
import SchedulersNewComponent from 'components/schedulers/new'
import { createScheduler } from 'actions/schedulers'
import { parseScheduler, setInPath } from 'constants/scheduler_template'

class SchedulersNew extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      scheduler: null
    }
  }

  componentDidMount = () => {
    this.setState({
      scheduler: parseScheduler()
    })
  }

  headerTitle = () => (
    <div>
      <BackButton />
      New Scheduler
    </div>
  )

  handleChange = event => {
    this.setState({
      ...this.state,
      scheduler: setInPath(this.state.scheduler,
        event.target.id,
        event.target.value)
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await createScheduler(this.state.scheduler)
  }

  render = () => (
    <SchedulersNewComponent
      headerTitle={this.headerTitle()}
      scheduler={this.state.scheduler}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
    />
  )
}

export default connect()(SchedulersNew)

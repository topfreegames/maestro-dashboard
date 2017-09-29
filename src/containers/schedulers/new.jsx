import React from 'react'
import { connect } from 'react-redux'
import { BackButton } from 'components/common'
import SchedulersNewComponent from 'components/schedulers/new'
import { createScheduler } from 'actions/schedulers'
import { parse , setInPath } from 'helpers/templates'
import schedulerTemplate from 'constants/scheduler_template'

class SchedulersNew extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      scheduler: null
    }
  }

  componentDidMount = () => {
    this.setState({
      scheduler: parse(schedulerTemplate)
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
      scheduler: setInPath(
        schedulerTemplate,
        this.state.scheduler,
        event.target.id,
        event.target.value)
    })
  }

  handleAdd = (event, path, format) => {
    this.setState({
      ...this.state,
      scheduler: setInPath(
        schedulerTemplate,
        this.state.scheduler,
        path,
        format
      )
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
      handleAdd={this.handleAdd}
      handleSubmit={this.handleSubmit}
    />
  )
}

export default connect()(SchedulersNew)

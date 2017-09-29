import React from 'react'
import { connect } from 'react-redux'
import SchedulersEditComponent from 'components/schedulers/edit'
import { getScheduler, updateScheduler } from 'actions/schedulers'
import { parse, setInPath, removeInPath } from 'helpers/templates'
import schedulerTemplate from 'constants/scheduler_template'

class SchedulersEdit extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      scheduler: null
    }
  }

  componentWillReceiveProps = nextProps => {
    // deep diff this.props and nextProps
    if (this.state.scheduler !== null || !nextProps.name) return

    this.setState({
      scheduler: parse(schedulerTemplate, nextProps)
    })
  }

  componentDidMount = async () => {
    this.props.dispatch(getScheduler(this.props.route.options.name))
  }

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

  handleSubmit = async event => {
    event.preventDefault()
    await updateScheduler(this.state.scheduler)
  }

  handleAdd = (event, path, format) => {
    event.preventDefault()

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

  handleRemove = (event, path, index) => {
    event.preventDefault()

    this.setState({
      ...this.state,
      scheduler: removeInPath(
        this.state.scheduler,
        path,
        index
      )
    })
  }

  render = () => (
    <SchedulersEditComponent
      scheduler={this.state.scheduler}
      handleChange={this.handleChange}
      handleAdd={this.handleAdd}
      handleRemove={this.handleRemove}
      handleSubmit={this.handleSubmit}
    />
  )
}

export default connect((state, ownProps) => ({
  ...state.schedulers.show[ownProps.route.options.name]
}))(SchedulersEdit)

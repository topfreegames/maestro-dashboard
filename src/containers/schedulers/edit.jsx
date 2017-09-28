import React from 'react'
import { connect } from 'react-redux'
import SchedulersEditComponent from 'components/schedulers/edit'
import { BackButton } from 'components/common'
import { getScheduler, updateScheduler } from 'actions/schedulers'
import { parseScheduler, setInPath } from 'constants/scheduler_template'

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
      scheduler: parseScheduler(nextProps)
    })
  }

  componentDidMount = async () => {
    this.props.dispatch(getScheduler(this.props.route.options.name))
  }

  headerTitle = () => (
    <div>
      <BackButton />
      {this.props.name}
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
    await updateScheduler(this.state.scheduler)
  }

  render = () => (
    <SchedulersEditComponent
      headerTitle={this.headerTitle}
      scheduler={this.state.scheduler}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
    />
  )
}

export default connect((state, ownProps) => ({
  ...state.schedulers.show[ownProps.route.options.name]
}))(SchedulersEdit)

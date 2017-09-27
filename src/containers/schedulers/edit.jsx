import React from 'react'
import { connect } from 'react-redux'
import SchedulersEditComponent from 'components/schedulers/edit'
import { getScheduler, updateScheduler } from 'actions/schedulers'
import history from 'constants/history'
import { parseScheduler, getType } from 'constants/scheduler_template'

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
      <button onClick={() => history.go(-1)}>Back</button>
      {this.props.name}
    </div>
  )

  handleChange = event => {
    const setInPath = path =>
      path.split('.').reduce((acc, x, i, arr) => {
        if (i === arr.length - 1) {
          if (event.target.value === '') {
            acc[x] = ''
          } else {
            acc[x] = getType(path) === 'integer'
              ? parseInt(event.target.value)
              : event.target.value
          }
        } else {
          return acc[x]
        }
      }, this.state.scheduler)

    setInPath(event.target.name)
    this.setState({...this.state})
  }

  handleSubmit = async event => {
    event.preventDefault()
    await updateScheduler(this.state.scheduler.name, this.state.scheduler)
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

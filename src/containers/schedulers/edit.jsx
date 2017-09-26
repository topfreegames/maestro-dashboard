import React from 'react'
import { connect } from 'react-redux'
import Header from 'components/common/header'
import { getScheduler } from 'actions/schedulers'
import history from 'constants/history'

class SchedulersEdit extends React.Component {
  componentDidMount = async () => {
    this.props.dispatch(getScheduler(this.props.route.options.name))
  }

  headerTitle = () => (
    <div>
      <button onClick={() => history.go(-1)}>Back</button>
      {this.props.name}
    </div>
  )

  render = () => (
    <div>
      <Header title={this.headerTitle()} />
    </div>
  )
}

export default connect((state, ownProps) => ({
  ...state.schedulers.show[ownProps.route.options.name]
}))(SchedulersEdit)

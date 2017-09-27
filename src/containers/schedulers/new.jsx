import React from 'react'
import { connect } from 'react-redux'
import { Header, BackButton } from 'components/common'

class SchedulersNew extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      scheduler: null
    }
  }

  headerTitle = () => (
    <div>
      <BackButton />
      {this.props.name}
    </div>
  )

  render = () => (
    <Header title={this.headerTitle()} />
  )
}

export default connect()(SchedulersNew)

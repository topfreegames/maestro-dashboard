import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Expire extends React.Component {
  constructor () {
    super()

    this.state = {
      visible: true
    }
  }

  setTimer = () => {
    if (!this._timer) clearTimeout(this._timer)

    this._timer = setTimeout(() => {
      this.setState({ visible: false })
      this._timer = null
    }, this.props.delay)
  }

  clearTimeout = () => {
    this._timer = null
  }

  componentWillUnmount = () => clearTimeout(this._timer)

  componentWillReceiveProps = nextProps => {
    this.setTimer()
    this.setState({ visible: true })
  }

  componentDidMount = () => this.setTimer()

  render = () => (
    <div {...this.props.styles}>
      <ReactCSSTransitionGroup
        transitionName='expire'
        transitionAppear
        transitionEnterTimeout={this.props.delay / 3}
        transitionLeaveTimeout={this.props.delay / 3}
        transitionAppearTimeout={this.props.delay / 3}
      >
        {this.state.visible && this.props.children}
      </ReactCSSTransitionGroup>
    </div>
  )
}

export default Expire

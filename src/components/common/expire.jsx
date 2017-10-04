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
    if (nextProps.children !== this.props.children) {
    }
  }

  componentDidMount = () => this.setTimer()

  render = () => (
    <div {...this.props.styles}>
      <ReactCSSTransitionGroup
        transitionName='expire'
        transitionAppear={true}
        transitionEnterTimeout={this.props.delay}
        transitionLeaveTimeout={this.props.delay}
        transitionAppearTimeout={this.props.delay}
      >
        {this.state.visible && this.props.children}
      </ReactCSSTransitionGroup>
    </div>
  )
}

export default Expire

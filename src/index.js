import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'containers/router'
import { connect, Provider } from 'react-redux'
import store from 'reducers'
require('es6-promise').polyfill()
require('isomorphic-fetch')

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      canRender: false
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.rehydrated &&
      !nextProps.session.token &&
      !nextProps.routeElement.public) {
      window.location = '/'
    } else if (nextProps.rehydrated) {
      this.setState({
        ...this.state,
        canRender: true
      })
    }
  }

  render () {
    const { route, routeElement } = this.props
    const { canRender } = this.state
    return canRender ? <routeElement.element route={route} /> : <div />
  }
}

const AppWithProps = connect(state => ({
  rehydrated: state.storage.rehydrated,
  session: state.session
}))(App)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppWithProps />
    </Router>
  </Provider>,
  document.getElementById('app')
)

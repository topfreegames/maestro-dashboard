import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'containers/router'
import { connect, Provider } from 'react-redux'
import store from 'reducers'
require('es6-promise').polyfill()
require('isomorphic-fetch')

class App extends React.Component {
  render () {
    const { route, routeElement, rehydrated } = this.props
    return rehydrated ? <routeElement.element route={route} /> : <div />
  }
}

const AppWithProps = connect(state => ({
  rehydrated: state.storage.rehydrated
}))(App)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppWithProps />
    </Router>
  </Provider>,
  document.getElementById('app')
)

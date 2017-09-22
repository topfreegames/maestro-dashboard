import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'containers/router'
require('es6-promise').polyfill()
require('isomorphic-fetch')

class App extends React.Component {
  render () {
    const { route, routeElement } = this.props
    return <routeElement.element route={route} />
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)

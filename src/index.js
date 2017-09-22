import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'containers/router'

class App extends React.Component {
  render () {
    const Element = this.props.element
    return <Element />
  }
}

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById('app')
)

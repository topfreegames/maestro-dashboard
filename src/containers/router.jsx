import React from 'react'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class Router extends React.Component {
  componentDidMount = () => {
    history.listen(this.resolve)
    this.resolve(history.location)
  }

  resolve = location => {
    console.log(location)
  }

  render = () => {
    return this.props.children
  }
}

export default Router

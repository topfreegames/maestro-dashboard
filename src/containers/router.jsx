import React from 'react'
import routes from 'constants/routes'
import history from 'constants/history'
import routesElements from 'constants/routes_elements'

const BlankDiv = () => (<div />)

class Router extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      route: {},
      routeElement: { element: BlankDiv }
    }
  }

  componentDidMount = () => {
    history.listen(this.resolve)
    this.resolve(history.location)
  }

  resolve = location => {
    const route = routes.lookup(location.pathname + location.search) || {}
    this.setState({
      route,
      routeElement: routesElements[route.name] || routesElements['default']
    })
  }

  render = () => {
    return React.cloneElement(
      React.Children.only(this.props.children),
      { ...this.state }
    )
  }
}

export default Router

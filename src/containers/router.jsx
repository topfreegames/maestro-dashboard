import React from 'react'
import routes from 'constants/routes'
import history from 'constants/history'
import routesElements from 'constants/routes_elements'

const BlankDiv = () => (<div />)

class Router extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      routeElement: { element: null }
    }
  }

  componentDidMount = () => {
    history.listen(this.resolve)
    this.resolve(history.location)
  }

  resolve = location => {
    const route = routes.lookup(location.pathname) || {}
    this.setState({
      routeElement: routesElements[route.name] || routesElements['default']
    })
  }

  render = () => {
    return React.cloneElement(
      React.Children.only(this.props.children),
      {
        element: this.state.routeElement.element || BlankDiv
      }
    )
  }
}

export default Router

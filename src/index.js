import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import { connect, Provider } from 'react-redux'
import Router from 'containers/router'
import store from 'reducers'
require('es6-promise').polyfill()
require('isomorphic-fetch')

class App extends React.Component {
  componentWillReceiveProps = nextProps => {
    if (!(nextProps.session.code || nextProps.session.token) &&
      !nextProps.routeElement.public) {
      window.location = '/'
    }
  }

  render () {
    const { route, routeElement } = this.props
    return <routeElement.element route={route} />
  }
}

const AppWithProps = connect(state => ({
  session: state.session
}))(App)

class Bootloader extends React.Component {
  constructor (props) {
    super(props)
    this.state = { rehydrated: false }
  }

  componentWillMount = () =>
    persistStore(store, {}, () => this.setState({ rehydrated: true }))

  render = () => {
    const { rehydrated } = this.state
    return !rehydrated ? <div /> : (
      <Provider store={store}>
        <Router>
          <AppWithProps />
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Bootloader />,
  document.getElementById('app')
)

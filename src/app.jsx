import React from 'react'
import { persistStore } from 'redux-persist'
import { connect, Provider } from 'react-redux'
import Router from 'containers/router'
import { Snackbar } from 'components/common'
import store from 'reducers'
import { navigate } from 'actions/common'

class App extends React.Component {
  checkSession = props => {
    if (props.route.name !== 'gACallback' &&
      !(props.session.code || props.session.token) &&
      !props.routeElement.public) {
      navigate('/')
    }
  }

  componentWillReceiveProps = nextProps => this.checkSession(nextProps)

  render () {
    const { route, routeElement, snackbar } = this.props

    return (
      <div>
        <routeElement.element route={route} />
        {snackbar && <Snackbar
          delay={300}
          {...this.props.snackbar}
        />}
      </div>
    )
  }
}

const AppWithProps = connect(state => ({
  session: state.session,
  snackbar: state.snackbar
}))(App)

class Bootloader extends React.Component {
  constructor (props) {
    super(props)
    this.state = { rehydrated: false }
  }

  componentWillMount = () =>
    persistStore(store, {
      blacklist: ['snackbar']
    }, () => this.setState({ rehydrated: true }))

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

export default Bootloader

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import { connect, Provider } from 'react-redux'
import Router from 'containers/router'
import { Snackbar } from 'components/common'
import store from 'reducers'
import { navigate } from 'actions/common'
require('es6-promise').polyfill()
require('isomorphic-fetch')

class App extends React.Component {
  componentWillReceiveProps = nextProps => {
    if (!(nextProps.session.code || nextProps.session.token) &&
      !nextProps.routeElement.public) {
      navigate('/')
    }
  }

  render () {
    const { route, routeElement } = this.props

    return (
      <div>
        <routeElement.element route={route} />
        <Snackbar
          text={this.props.snackbar.text}
          delay={300}
          action={{ text: 'UNDO' }}
        />
      </div>
    )
  }
}

const AppWithProps = connect(state => ({
  session: state.session,
  snackbar: {
    text: 'Some text goes here'
  }
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

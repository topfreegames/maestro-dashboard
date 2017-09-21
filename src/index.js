import React from 'react'
import ReactDOM from 'react-dom'
import ClientOAuth2 from 'client-oauth2'
import Router from 'containers/router'

const maestroAuth = new ClientOAuth2({
  clientId: '868448437295-joa51hkm334scbll4vuodn59de3pofgu.apps.googleusercontent.com',
  authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirectUri: 'http://localhost:8080',
  scopes: ['email', 'profile'],
  state: 'asdf'
})

class App extends React.Component {
  componentDidMount () {
    console.log(maestroAuth.token.getUri())
  }

  render () {
    return <div>HERE</div>
  }
}

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById('app')
)

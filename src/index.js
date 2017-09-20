import React from 'react'
import ReactDOM from 'react-dom'
import ClientOAuth2 from 'client-oauth2'

const maestroAuth = new ClientOAuth2({
  clientId: '868448437295-joa51hkm334scbll4vuodn59de3pofgu.apps.googleusercontent.com',
  authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirectUri: 'http://localhost:8080',
  scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
  state: 'asdf'
})

window.oauth2Callback = uri => {
  console.log('callback')
  maestroAuth.token.getToken(uri)
    .then(user => {
      console.log(user)
    })
}

class App extends React.Component {
  componentDidMount () {
    console.log(maestroAuth.token.getUri())
  }

  render () {
    return <div>HERE</div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

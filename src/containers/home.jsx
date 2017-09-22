import React from 'react'
import ClientOAuth2 from 'client-oauth2'

const maestroAuth = new ClientOAuth2({
  clientId: '868448437295-joa51hkm334scbll4vuodn59de3pofgu.apps.googleusercontent.com',
  authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirectUri: 'http://localhost:8080/ga_callback',
  scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  state: 'asdf'
})

class Home extends React.Component {
  render () {
    return <div onClick={() => (window.location = maestroAuth.code.getUri())}>SIGN IN</div>
  }
}

export default Home

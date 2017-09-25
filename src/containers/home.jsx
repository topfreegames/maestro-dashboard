import React from 'react'
import ClientOAuth2 from 'client-oauth2'

const maestroAuth = new ClientOAuth2({
  clientId: process.env.GA_CLIENT_ID,
  authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirectUri: process.env.GA_CALLBACK,
  scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  state: 'asdf',
  query: {
    access_type: 'offline',
    prompt: 'consent'
  }
})

class Home extends React.Component {
  render () {
    return <div onClick={() => (window.location = maestroAuth.code.getUri())}>SIGN IN</div>
  }
}

export default Home

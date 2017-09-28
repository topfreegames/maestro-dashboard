import ClientOAuth2 from 'client-oauth2'
import { navigate } from 'actions/common'

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

export const getCode = () => (
  navigate(maestroAuth.code.getUri(), { isExternal: true })
)

export const exchangeCode = async (code, host) => {
  const redirectUri = encodeURIComponent(process.env.GA_CALLBACK)
  const response =
    await fetch(`${host}/access?code=${code}&redirect_uri=${redirectUri}`)

  if (response.status !== 200) {
    // handle error
  }

  const { token } = await response.json()
  return token
}

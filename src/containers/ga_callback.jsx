import React from 'react'
import { connect } from 'react-redux'
import history from 'constants/history'
import actions from 'constants/actions'

const exchangeCode = async (code) => {
  const redirectUri = encodeURIComponent(process.env.GA_CALLBACK)
  const response =
    await fetch(`${process.env.MAESTRO_URL}/access?code=${code}&redirect_uri=${redirectUri}`)

  if (response.status !== 200) {
    // handle error
  }

  const { token } = await response.json()
  return token
}

class GACallback extends React.Component {
  async componentWillMount () {
    if (!this.props.route.options || this.props.session.token) return

    const { code } = this.props.route.options

    const token = await exchangeCode(code)
    this.props.dispatch({ type: actions.session.setToken, token })
  }

  componentDidMount = () => this.maybeRedirectToDashboard()
  componentDidUpdate = () => this.maybeRedirectToDashboard()

  maybeRedirectToDashboard = () => {
    if (this.props.session.token) history.push('dashboard')
  }

  render () {
    console.log(this.props)
    return <div />
  }
}

export default connect(state => ({
  session: state.session
}))(GACallback)

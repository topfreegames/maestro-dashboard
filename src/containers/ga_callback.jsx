import React from 'react'

const exchangeCode = async (code) => {
  const redirectUri = encodeURIComponent('http://localhost:8080/ga_callback')
  const response =
    await fetch(`http://localhost:5001/access?code=${code}&redirect_uri=${redirectUri}`)

  if (response.status !== 200) {
    // handle error
  }

  const { token } = await response.json()
  return token
}

class GACallback extends React.Component {
  async componentWillMount () {
    if (!this.props.route.options) return

    const { code } = this.props.route.options

    const token = await exchangeCode(code)
  }

  render () {
    return <div />
  }
}

export default GACallback

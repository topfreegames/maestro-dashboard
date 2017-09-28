import React from 'react'
import { getCode } from 'actions/session'

class Home extends React.Component {
  render () {
    return <div onClick={() => getCode()}>SIGN IN</div>
  }
}

export default Home

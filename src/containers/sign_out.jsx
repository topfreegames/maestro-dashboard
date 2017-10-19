import React from 'react'
import { signOut } from 'helpers/common'

class SignOut extends React.Component {
  componentDidMount = () => signOut()
  render = () => <div />
}

export default SignOut

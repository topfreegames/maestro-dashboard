import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import GoogleButton from 'react-google-button'
import { getCode } from 'actions/session'
import { navigate } from 'actions/common'
import styles from 'constants/styles'

const signIn = event => {
  event.preventDefault()
  getCode()
}

class Home extends React.Component {
  componentWillMount = () => {
    if (this.props.session.code || this.props.session.token) {
      navigate('dashboard')
    }
  }

  render = () => (
    <div {...Home.styles}>
      <div>M</div>
      <GoogleButton
        type='light'
        onClick={signIn}
      />
    </div>
  )
}

Home.styles = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: styles.colors.brandPrimary,

  '> div:nth-of-type(1)': {
    fontSize: '300px',
    fontWeight: 600,
    color: 'white'
  }
})

export default connect(state => ({ session: state.session }))(Home)

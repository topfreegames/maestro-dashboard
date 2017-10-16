import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import Clusters from 'containers/clusters'
import { Button } from 'components/common'
import styles from 'constants/styles'
import { signOut } from 'helpers/common'

const Settings = ({ switchToSchedulers, dispatch }) => (
  <div {...Settings.styles}>
    <label>Clusters</label>
    <Clusters switchToSchedulers={switchToSchedulers} />
    <label>More</label>
    <Button
      handleClick={signOut}
      customStyles={buttonCustomStyles}
    >
      Sign out
    </Button>
  </div>
)

const buttonCustomStyles = css({
  width: '100%'
})

Settings.styles = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',

  '> * + *': {
    marginTop: '16px'
  },

  '> label': {
    textTransform: 'uppercase',
    color: styles.colors.brandPrimary,
    fontSize: styles.fontSizes['3'],
    marginLeft: '10px'
  }
})

export default connect()(Settings)

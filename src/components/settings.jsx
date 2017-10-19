import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import Clusters from 'containers/clusters'
import { Button } from 'components/common'
import { navigate } from 'actions/common'
import styles from 'constants/styles'

const Settings = ({ switchToSchedulers, dispatch }) => (
  <div {...Settings.styles}>
    <label>Clusters</label>
    <Clusters switchToSchedulers={switchToSchedulers} />
    <label>More</label>
    <Button
      handleClick={() => navigate('/sign_out')}
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

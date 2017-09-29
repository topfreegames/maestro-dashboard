import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const HeaderBar = ({ left, title, right }) => (
  <div {...HeaderBar.styles}>
    <div>{left}</div>
    <div>{title}</div>
    <div>{right}</div>
  </div>
)

const commonStyles = css({
  fontWeight: '500',
  fontSize: '18px'
})

const smallStyles = css({
  [`@media(max-width: ${styles.minWidth})`]: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    height: '48px',
    padding: '0 16px',
    borderBottom: `1px ${styles.colors.gray_0} solid`,
    backgroundColor: styles.colors.brandBackground,

    '> div:nth-of-type(2)': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '48px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    '& + div': {
      marginTop: '48px'
    }
  }
})

HeaderBar.styles = css(
  commonStyles,
  smallStyles
)

export default HeaderBar

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
    backgroundColor: styles.colors.background,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',

    '> * > div, > div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      '> * + *': {
        marginLeft: '10px'
      }
    },

    '> div:nth-of-type(2)': {
      display: 'flex',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      height: '48px',
      alignItems: 'center'
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

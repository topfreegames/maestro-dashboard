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
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '100%',
  height: '48px',
  padding: '0 16px',
  backgroundColor: styles.colors.background,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
  fontWeight: '500',
  fontSize: '18px',
  zIndex: 999,

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
})

const smallStyles = css({
  [`@media(max-width: ${styles.sizes.maxSmall})`]: {
    height: '48px'
  }
})

const largeStyles = css({
  [`@media(min-width: ${styles.sizes.minLarge})`]: {
    height: '56px'
  }
})

HeaderBar.styles = css(
  commonStyles,
  smallStyles,
  largeStyles
)

export default HeaderBar

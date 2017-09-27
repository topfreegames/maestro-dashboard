import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const HeaderBar = ({ title }) => (
  <div {...HeaderBar.styles}>{title}</div>
)

const commonStyles = css({
  fontWeight: '600',
  fontSize: '18px'
})

const smallStyles = css({
  [`@media(max-width: ${styles.minWidth})`]: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    height: '48px',
    padding: '0 16px',
    borderBottom: `1px ${styles.colors.gray_0} solid`
  }
})

HeaderBar.styles = css(
  commonStyles,
  smallStyles
)

export default HeaderBar

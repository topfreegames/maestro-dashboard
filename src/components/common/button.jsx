import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const Button = ({ children, handleClick }) => (
  <button {...Button.styles} onClick={handleClick}>{children}</button>
)

Button.styles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 20px',
  height: '36px',
  background: styles.colors.brandPrimary,
  border: 'none',
  borderRadius: '2px',
  color: styles.colors.background,
  boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.3)',
  fontSize: styles.fontSizes['3'],
  fontWeight: 400,
  textTransform: 'uppercase'
})

export default Button

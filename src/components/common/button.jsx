import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const Button = ({ children, handleClick, variant, size, customStyles }) => (
  <button
    {...css(Button.styles, variants[variant], sizes[size], css(customStyles))}
    onClick={handleClick}
  >
    {children}
  </button>
)

const sizes = {
  small: css({
    height: '24px',
    fontSize: styles.fontSizes['2']
  })
}

const variants = {
  ghost: css({
    backgroundColor: styles.colors.background,
    color: styles.colors.gray_100
  }),
  secondary: css({
    backgroundColor: styles.colors.brandSecondary
  }),
  inverse: css({
    backgroundColor: styles.colors.brandInverse,
    color: styles.colors.gray_100
  })
}

Button.styles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-end',
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

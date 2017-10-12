import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const divStyles = css({
  color: styles.colors.brandPrimary,
  fontWeight: 700,
  fontSize: styles.fontSizes['8']
})

export default () => (
  <div {...divStyles}>M</div>
)

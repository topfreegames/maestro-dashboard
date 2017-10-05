import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const AddButton = ({ handleClick }) => (
  <div
    onClick={handleClick}
    {...AddButton.styles}
  >
    +
  </div>
)

AddButton.styles = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '56px',
  height: '56px',
  backgroundColor: styles.colors.brandPrimary,
  color: styles.colors.background,
  fontSize: '30px',
  borderRadius: '50%',
  position: 'fixed',
  bottom: '16px',
  right: '16px',
  boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.3)'
})

export default AddButton

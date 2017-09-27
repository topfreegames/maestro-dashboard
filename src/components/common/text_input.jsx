import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const TextInput = ({ id, label, value, handleChange }) => (
  <div {...TextInput.styles}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type='text'
      value={value}
      onChange={handleChange}
    />
  </div>
)

TextInput.styles = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '& + &': {
    marginTop: '16px'
  },

  '& label': {
    marginLeft: '8px',
    textTransform: 'uppercase',
    fontSize: styles.fontSizes['2'],
    color: styles.colors.gray_75
  },

  '& input': {
    fontSize: styles.fontSizes['3'],
    padding: '6px 12px',
    border: 'none',
    borderBottom: `2px solid ${styles.colors.gray_50}`,

    '&:focus': {
      fontWeight: 600,
      borderColor: styles.colors.brandPrimary
    }
  }
})

export default TextInput

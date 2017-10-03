import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const TextInput = ({ id, label, value, handleChange, error }) => (
  <div {...TextInput.styles}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type='text'
      value={value}
      onChange={handleChange}
      className={error && 'error'}
    />
    {error && error.map(e => <div key={e.msg}>{e.msg}</div>)}
  </div>
)

TextInput.styles = css({
  display: 'inline-flex',
  flexDirection: 'column',

  '& label': {
    textTransform: 'uppercase',
    fontSize: styles.fontSizes['2'],
    color: styles.colors.gray_75
  },

  '& input': {
    fontSize: styles.fontSizes['3'],
    padding: '6px 0 6px',
    border: 'none',
    borderBottom: `1px solid ${styles.colors.gray_50}`,

    '&:focus': {
      fontWeight: 500,
      padding: '6px 0 5px',
      borderBottom: `2px solid ${styles.colors.brandPrimary}`
    },

    '&.error': {
      borderColor: styles.colors.brandSecondary
    }
  },

  '> div': {
    marginTop: '6px',
    textAlign: 'right',
    fontSize: styles.fontSizes['1'],
    color: styles.colors.brandSecondary
  }
})

export default TextInput

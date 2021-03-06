import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const TextInput = ({
  id,
  label,
  placeholder,
  value,
  handleChange,
  handleFocus,
  handleBlur,
  error
}) => (
  <div {...TextInput.styles}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type='text'
      autoComplete='off'
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={error && 'error'}
    />
    <div className='bar' />
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

  '& .bar': {
    position: 'relative',
    display: 'block',
    margin: 0,
    padding: 0,
    height: 0,

    '&::before, &::after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      backgroundColor: styles.colors.brandPrimary,
      height: '2px',
      width: 0,
      transition: '0.2s cubic-bezier(0.64, 0.09, 0.08, 1) all'
    },

    '&::before': { left: '50%' },
    '&::after': { right: '50%' }
  },

  '& input': {
    position: 'relative',
    fontSize: styles.fontSizes['3'],
    padding: '6px 0 6px',
    border: 'none',
    borderBottom: `1px solid ${styles.colors.gray_50}`,
    outline: 'none',
    borderRadius: 0,

    '&:focus ~ .bar::before, &:focus ~ .bar::after': {
      width: '50%'
    },

    '&.error': {
      borderColor: styles.colors.brandSecondary,

      '& ~ .bar::before, & ~ .bar::after': {
        backgroundColor: styles.colors.brandSecondary
      },
      '&:focus ~ .bar::before, &:focus ~ .bar::after': {
        backgroundColor: styles.colors.brandSecondary
      }
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

import React from 'react'
import { css } from 'glamor'
import Expire from './expire'
import styles from 'constants/styles'

const Snackbar = ({ text, delay, action }) => (
  <Expire delay={delay * 8} styles={Snackbar.transitionStyles(delay)}>
    <div {...Snackbar.styles}>
      <div className='text'>{text}</div>
      {action && <div className='action'>{action.text}</div>}
    </div>
  </Expire>
)

Snackbar.styles = css({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
  background: 'rgba(0, 0, 0, 0.9)',
  color: 'white',
  fontWeight: 400,
  fontSize: styles.fontSizes['3'],

  '> .action': {
    textTransform: 'uppercase',
    color: styles.colors.brandSecondary
  }
})

Snackbar.transitionStyles = delay => css({
  '& .expire-appear, & .expire-leave.expire-leave-active': {
    transform: 'translate(0, 100%)',

    '& .text': {
      opacity: '0.01'
    }
  },

  '& .expire-appear.expire-appear-active, & .expire-leave': {
    transform: 'translate(0, 0)',
    transition: `all ${delay}ms`,

    '& .text': {
      opacity: '1.0',
      transition: `opacity ${delay}ms ease-in`
    }
  }
})

export default Snackbar

import React from 'react'
import { css } from 'glamor'
import Expire from './expire'
import styles from 'constants/styles'

const Snackbar = ({ text, delay }) => (
  <Expire delay={delay * 8} styles={Snackbar.transitionStyles(delay)}>
    <div {...Snackbar.styles}>
      <div className='text'>{text}</div>
    </div>
  </Expire>
)

Snackbar.styles = css({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  display: 'flex',
  padding: '12px 24px',
  background: 'rgba(0, 0, 0, 0.9)',
  color: 'white',
  fontWeight: 400,
  fontSize: styles.fontSizes['3']
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

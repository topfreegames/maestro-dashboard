import React from 'react'
import { css } from 'glamor'

const Spinner = () => (
  <div {...Spinner.styles} className='loader'>Loading...</div>
)

const load8 = css.keyframes({
  '0%': {
    WebkitTransform: 'rotate(0deg)',
    transform: 'rotate(0deg)'
  },
  '100%': {
    WebkitTransform: 'rotate(360deg)',
    transform: 'rotate(360deg)'
  }
})

Spinner.styles = css({
  '.loader, .loader:after': {
    borderRadius: '50%',
    width: '10em',
    height: '10em',
    color: 'red'
  },

  '.loader': {
    margin: '60px auto',
    fontSize: '10px',
    position: 'relative',
    textIndent: '-9999em',
    borderTop: '1.1em solid rgba(255, 255, 255, 0.2)',
    borderRight: '1.1em solid rgba(255, 255, 255, 0.2)',
    borderBottom: '1.1em solid rgba(255, 255, 255, 0.2)',
    borderLeft: '1.1em solid #ffffff',
    WebkitTransform: 'translateZ(0)',
    MsTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    WebkitAnimation: `${load8} 1.1s infinite linear`,
    animation: `${load8} 1.1s infinite linear`
  }
})



export default Spinner

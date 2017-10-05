import React from 'react'
import { css } from 'glamor'
import Expire from './expire'
import styles from 'constants/styles'

class Snackbar extends React.Component {
  constructor (props) {
    super(props)

    this.state = { visible: true }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ visible: (nextProps.uuid !== this.props.uuid) })
  }

  render = () => {
    const { text, delay, action, isError } = this.props

    return this.state.visible ? (
      <Expire delay={delay * 8} styles={Snackbar.transitionStyles(delay)}>
        <div {...Snackbar.styles}>
          <div>
            {isError && <i className='fa fa-exclamation' aria-hidden='true' />}
            <div className='text'>{text}</div>
          </div>
          {action && <div className='action'>{action.text}</div>}
        </div>
      </Expire>
    ) : <div />
  }
}

Snackbar.styles = css({
  position: 'fixed',
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
  lineHeight: `calc(${styles.fontSizes['3']} + 8px)`,

  '> div:nth-of-type(1)': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    '& .fa + *': {
      marginLeft: '6px'
    }
  },

  '> .action': {
    textTransform: 'uppercase',
    color: styles.colors.brandSecondary
  }
})

Snackbar.transitionStyles = delay => css({
  '& .expire-appear, & .expire-enter, & .expire-leave.expire-leave-active': {
    transform: 'translate(0, 100%)',

    '& .text': {
      opacity: '0.01'
    }
  },

  [`& .expire-appear.expire-appear-active,
    & .expire-enter.expire-enter-active, & .expire-leave`]: {
      transform: 'translate(0, 0)',
      transition: `all ${delay}ms`,

      '& .text': {
        opacity: '1.0',
        transition: `opacity ${delay}ms ease-in`
      }
    }
})

export default Snackbar

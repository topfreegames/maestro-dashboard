import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { css } from 'glamor'
import TextInput from './text_input'
import styles from 'constants/styles'

const transitionDelayMs = 100

class AutoComplete extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showOptions: false
    }
  }

  toggleOptions = e => this.setState({ showOptions: !this.state.showOptions })

  renderOption = o => (
    <li
      key={o}
      className={o === this.props.value && 'active'}
      onClick={e => this.handleClick(e, o)}
    >
      {o}
    </li>
  )

  handleClick = (e, o) => {
    e.stopPropagation()
    e.preventDefault()
    this.props.handleChange({ target: { value: o } })
    this.toggleOptions()
  }

  render = () => (
    <div>
      {this.state.showOptions &&
        <div {...viewportWrapperStyles} onClick={this.toggleOptions} />
      }
      <div {...AutoComplete.styles} {...AutoComplete.transitionStyles(transitionDelayMs)}>
        <TextInput
          placeholder={this.props.placeholder}
          value={this.props.value}
          handleFocus={this.toggleOptions}
          handleChange={this.props.handleChange}
        />
        {this.state.showOptions &&
          <ReactCSSTransitionGroup
            transitionName='auto-complete'
            transitionAppear
            transitionEnterTimeout={transitionDelayMs}
            transitionLeaveTimeout={transitionDelayMs}
            transitionAppearTimeout={transitionDelayMs}
          >
            <ul>
              <li
                className={this.props.value === '' && 'active'}
                onClick={e => this.handleClick(e, '')}
              >
                <i className='fa fa-asterisk' aria-hidden='true' />
              </li>
              {
                this.props.options
                  .sort((a, b) => a > b ? 1 : -1)
                  .map(o => this.renderOption(o))
              }
            </ul>
          </ReactCSSTransitionGroup>
        }
      </div>
    </div>
  )
}

const viewportWrapperStyles = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  background: 'transparent'
})

AutoComplete.transitionStyles = delay => css({
  '& .auto-complete-appear, & .auto-complete-enter, & .auto-complete-leave.auto-complete-leave-active': {
    transformOrigin: 'top',
    transform: 'scaleY(0)',
    opacity: '0.01'
  },

  [`& .auto-complete-appear.auto-complete-appear-active,
    & .auto-complete-enter.auto-complete-enter-active, & .auto-complete-leave`]: {
      transform: 'scaleY(1)',
      opacity: '1.0',
      transition: `transform ${delay}ms ease-in, opacity ${delay * 2}ms ease-in`
    }
})

AutoComplete.styles = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  '& ul': {
    position: 'absolute',
    top: '34px',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: styles.colors.background,
    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.3)',
    listStyle: 'none',

    '> li:nth-of-type(1)': {
      fontSize: styles.fontSizes['1']
    },

    '> li': {
      fontSize: styles.fontSizes['3'],
      padding: '12px',

      '&.active': {
        background: styles.colors.gray_0
      },

      '&:hover': {
        background: styles.colors.gray_25
      }
    }
  }
})

export default AutoComplete

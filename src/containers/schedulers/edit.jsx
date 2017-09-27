import React from 'react'
import { connect } from 'react-redux'
import Header from 'components/common/header'
import { getScheduler, updateScheduler } from 'actions/schedulers'
import history from 'constants/history'
import styles from 'constants/styles'
import schedulerYaml from 'constants/scheduler_yaml'
import { css } from 'glamor'

class SchedulersEdit extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      scheduler: null
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.state.scheduler !== null || !nextProps.name) return

    this.setState({
      scheduler: this.parseScheduler(nextProps)
    })
  }

  parseScheduler = props => {
    const parseSimple = (f, prefix) => ({
      [f.name]: this.getInputValue(this.makePath(prefix, f.name), props)
    })

    const parseSection = (f, prefix) => ({
      [f.name]: f.children.reduce((acc, x) => ({
        ...acc,
        ...parseField(x, `${this.makePath(prefix, f.name)}.`)
      }), {})
    })

    const parseField = (f, prefix) => {
      if (f.type === 'simple') {
        return parseSimple(f, prefix)
      } else if (f.type === 'section') {
        return parseSection(f, prefix)
      }
    }

    return schedulerYaml.reduce((acc, x) => ({
      ...acc,
      ...parseField(x, '')
    }), {})
  }

  componentDidMount = async () => {
    this.props.dispatch(getScheduler(this.props.route.options.name))
  }

  headerTitle = () => (
    <div>
      <button onClick={() => history.go(-1)}>Back</button>
      {this.props.name}
    </div>
  )

  getInputValue = (path, origin) =>
    path.split('.').reduce((acc, x) => acc[x], origin)

  makePath = (prefix, name) => `${prefix}${name}`

  renderSimple = (name, prefix) => (
    <div key={this.makePath(prefix, name)}>
      <label htmlFor={name}>{name}</label>
      <input
        name={this.makePath(prefix, name)}
        type='text'
        value={this.getInputValue(this.makePath(prefix, name), this.state.scheduler)}
        onChange={this.handleChange}
      />
    </div>
  )

  renderSection = ({ name, children }, prefix) => (
    <div className='section' key={this.makePath(prefix, name)}>
      <label>{name}</label>
      {children.map(x => this.renderInput(x, `${this.makePath(prefix, name)}.`))}
    </div>
  )

  renderInput = (input, prefix) => {
    if (input.type === 'simple') return this.renderSimple(input.name, prefix)
    else if (input.type === 'section') return this.renderSection(input, prefix)
  }

  handleChange = event => {
    const isInt = path =>
      path.split('.').reduce((acc, x, i, arr) => {
        if (i === arr.length - 1) {
          return acc[x].varType === 'integer'
        } else {
          return acc[x]
        }
      }, schedulerYaml)

    const setInPath = path =>
      path.split('.').reduce((acc, x, i, arr) => {
        if (i === arr.length - 1) {
          acc[x] = isInt(path) ? parseInt(event.target.value) : event.target.value
        } else {
          return acc[x]
        }
      }, this.state.scheduler)

    setInPath(event.target.name)
    this.setState({...this.state})
  }

  handleSubmit = async event => {
    event.preventDefault()
    await updateScheduler(this.state.scheduler.name, this.state.scheduler)
  }

  render = () => (
    <div {...SchedulersEdit.styles}>
      <Header title={this.headerTitle()} />
      <section role='main'>
        {this.state.scheduler && schedulerYaml.map(x => this.renderInput(x, ''))}
        <button onClick={this.handleSubmit}>Save</button>
      </section>
    </div>
  )
}

SchedulersEdit.styles = css({
  '> section[role="main"], .section': {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    padding: '16px',

    '> div': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },

    '> div + div': {
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
  },

  '& .section': {
    marginTop: '8px',
    border: `1px solid ${styles.colors.gray_25}`,

    '> label': {
      color: `${styles.colors.gray_100} !important`,
      margin: '0 0 8px -4px !important',
      fontSize: `${styles.fontSizes[`3`]} !important`,
      fontWeight: 600
    }
  }
})

export default connect((state, ownProps) => ({
  ...state.schedulers.show[ownProps.route.options.name]
}))(SchedulersEdit)

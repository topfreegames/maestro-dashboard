import React from 'react'
import {
  render,
  parse,
  setInPath,
  removeInPath
} from 'helpers/templates'

class Form extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formFor: null
    }
  }

  maybeUpdateFormFor = newForm => {
    const { formFor, template } = this.props

    // deep diff
    if (formFor && newForm && formFor.length !== newForm.length) return

    this.setState({
      ...this.state,
      formFor: parse(template, newForm)
    })
  }

  componentDidMount = () => this.maybeUpdateFormFor()
  componentWillReceiveProps =
    nextProps => this.maybeUpdateFormFor(nextProps.formFor)

  handleChange = event => {
    this.setState({
      ...this.state,
      formFor: setInPath(
        this.props.template,
        this.state.formFor,
        event.target.id,
        event.target.value)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleSubmit(this.state.formFor)
  }

  handleAdd = (event, path, format) => {
    event.preventDefault()

    this.setState({
      ...this.state,
      formFor: setInPath(
        this.props.template,
        this.state.formFor,
        path,
        format
      )
    })
  }

  handleRemove = (event, path, index) => {
    event.preventDefault()

    this.setState({
      ...this.state,
      formFor: removeInPath(
        this.state.formFor,
        path,
        index
      )
    })
  }

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        {render(this.props.template,
          this.state.formFor,
          this.handleChange,
          this.handleAdd,
          this.handleRemove)
        }
        {this.props.button}
      </form>
    )
  }
}

export default Form

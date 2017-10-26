import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import YAML from 'js-yaml'
import { Loading, YamlEditor, Header, Button, BackButton, Confirmation } from 'components/common'
import { Large } from 'components/common/responsive'
import { getSchedulerConfigYaml, updateScheduler, deleteScheduler } from 'actions/schedulers'
import { navigate } from 'actions/common'
import snackbar from 'helpers/snackbar'

const HeaderLeft = ({ schedulerName }) =>
  <div>
    <BackButton />
    <span>{schedulerName}</span>
  </div>

const HeaderRight = ({ confirmDeletion, updateScheduler }) =>
  <div {...css({ '> * + *': { marginLeft: '24px !important' } })}>
    <Button
      handleClick={updateScheduler}
    >
      Save
    </Button>
    <Button
      variant='secondary'
      handleClick={confirmDeletion}
    >
      Delete
    </Button>
  </div>

class SchedulersEdit extends React.Component {
  constructor () {
    super()

    this.state = {
      confirmationScreen: null,
      yaml: null,
      loading: true
    }
  }

  componentDidMount = async () => {
    const yaml = await getSchedulerConfigYaml(this.props.route.options.name)
    this.setState({ yaml, loading: false })
  }

  toggleLoading = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    })
  }

  updateScheduler = async () => {
    this.toggleLoading()

    const scheduler = YAML.safeLoad(this.state.yaml)
    const res = await updateScheduler(scheduler)

    this.toggleLoading()

    snackbar.textFromBoolean(
      res.status > 199 && res.status < 300,
      {
        isTrue: `${this.props.schedulerName} updated`,
        isFalse: `Error updating ${this.props.schedulerName}`
      }
    )
  }

  handleYamlChange = yaml => this.setState({ yaml })

  handleDeleteScheduler = async event => {
    event.preventDefault()
    this.toggleLoading()

    const name = this.props.schedulerName
    const res = await deleteScheduler(name)
    navigate('/dashboard')

    snackbar.textFromBoolean(
      res.status > 199 && res.status < 300,
      {
        isTrue: `${name} deleted`,
        isFalse: `Error deleting ${name}`
      }
    )
  }

  toggleConfirmation = confirmationScreen =>
    this.setState({ confirmationScreen })

  deleteConfirmation = () => (
    <Confirmation
      title='Delete Scheduler?'
      description={`
        ${this.props.schedulerName} will be permanently deleted from 
        [${this.props.cluster}] cluster
      `}
      close={() => this.toggleConfirmation()}
      actions={[
        { name: 'Cancel' },
        {
          name: 'Delete',
          func: e => this.handleDeleteScheduler(e)
        }
      ]}
    />
  )

  updateConfirmation = () => (
    <Confirmation
      title='Update Scheduler?'
      description={`
        ${this.props.schedulerName} will be updated in
        [${this.props.cluster}] cluster
      `}
      close={() => this.toggleConfirmation()}
      actions={[
        { name: 'Cancel' },
        {
          name: 'Update',
          func: () => this.updateScheduler()
        }
      ]}
    />
  )

  render = () => (
    <Large>
      {this.state.confirmationScreen && <this.state.confirmationScreen />}
      <Header
        left={<HeaderLeft schedulerName={this.props.schedulerName} />}
        right={
          <HeaderRight
            confirmDeletion={() =>
              this.toggleConfirmation(this.deleteConfirmation)
            }
            updateScheduler={() =>
              this.toggleConfirmation(this.updateConfirmation)
            }
          />
        }
      />
      {(this.state.loading || !this.state.yaml) &&
        <Loading position='fixed' />
      }
      <div {...SchedulersEdit.styles}>
        {this.state.yaml &&
          <YamlEditor
            value={this.state.yaml}
            handleChange={this.handleYamlChange}
          />
        }
      </div>
    </Large>
  )
}

SchedulersEdit.styles = css({
  '& .CodeMirror': {
    position: 'relative',
    height: 'auto'
  }
})

export default connect((state, ownProps) => ({
  schedulerName: ownProps.route.options.name,
  cluster: state.clusters.current
}))(SchedulersEdit)

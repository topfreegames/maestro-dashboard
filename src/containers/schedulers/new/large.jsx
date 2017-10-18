import React from 'react'
import { css } from 'glamor'
import { Loading, YamlEditor, Header, Button, BackButton } from 'components/common'
import { Large } from 'components/common/responsive'
import { createScheduler } from 'actions/schedulers'
import snackbar from 'helpers/snackbar'
import YAML from 'js-yaml'
import exampleSchedulerYaml from 'constants/example_scheduler_yaml'

const HeaderLeft = () =>
  <div>
    <BackButton />
    <span>New scheduler</span>
  </div>

const HeaderRight = ({ createScheduler }) =>
  <div {...css({ '> * + *': { marginLeft: '24px !important' } })}>
    <Button
      handleClick={createScheduler}
    >
      Save
    </Button>
  </div>

class SchedulersNew extends React.Component {
  constructor () {
    super()

    this.state = {
      loading: false,
      yaml: exampleSchedulerYaml
    }
  }

  toggleLoading = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    })
  }

  createScheduler = async () => {
    this.toggleLoading()

    const scheduler = YAML.safeLoad(this.state.yaml)
    const res = await createScheduler(scheduler)

    this.toggleLoading()

    snackbar.textFromBoolean(
      res.status > 199 && res.status < 300,
      {
        isTrue: `${scheduler.name} created`,
        isFalse: `Error creating ${scheduler.name}`
      }
    )
  }

  handleYamlChange = yaml => this.setState({ yaml })

  render = () => {
    return (
      <Large>
        <Header
          left={<HeaderLeft schedulerName={this.props.schedulerName} />}
          right={
            <HeaderRight
              createScheduler={this.createScheduler}
            />
          }
        />
        {this.state.loading && <Loading position='fixed' />}
        <div {...SchedulersNew.styles}>
          <YamlEditor
            value={this.state.yaml}
            handleChange={this.handleYamlChange}
          />
        </div>
      </Large>
    )
  }
}

SchedulersNew.styles = css({
  '& .CodeMirror': {
    height: 'auto'
  }
})

export default SchedulersNew

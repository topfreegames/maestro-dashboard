import React from 'react'
import { BackButton } from 'components/common'
import Form from 'components/schedulers/form'
import { createScheduler } from 'actions/schedulers'
import { Small } from 'components/common/responsive'
import snackbar from 'helpers/snackbar'
import { navigate } from 'actions/common'

const headerLeft = () =>
  <div>
    <BackButton />
    <span>New Scheduler</span>
  </div>

class SchedulersNew extends React.Component {
  constructor () {
    super()

    this.state = {
      showConfirmation: false,
      loading: false
    }
  }

  toggleLoading = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    })
  }

  handleSubmit = async scheduler => {
    this.toggleLoading()

    const res = await createScheduler(scheduler)

    this.toggleLoading()

    snackbar.textFromBoolean(
      res.status > 199 && res.status < 300,
      {
        isTrue: 'Scheduler created with success.',
        isFalse: 'Error creating scheduler.'
      }
    )

    navigate('/')
  }

  render = () => (
    <Small>
      <Form
        header={{
          left: headerLeft()
        }}
        isBlank
        handleSubmit={this.handleSubmit}
        loading={this.state.loading}
      />
    </Small>
  )
}

export default SchedulersNew

import React from 'react'
import { BackButton } from 'components/common'
import Form from 'components/schedulers/form'
import { createScheduler } from 'actions/schedulers'

const headerLeft = () =>
  <div>
    <BackButton />
    <span>New Scheduler</span>
  </div>

class SchedulersNew extends React.Component {
  handleSubmit = async scheduler => {
    await createScheduler(scheduler)
  }

  render = () => (
    <Form
      header={{
        left: headerLeft()
      }}
      isBlank
      handleSubmit={this.handleSubmit}
    />
  )
}

export default SchedulersNew

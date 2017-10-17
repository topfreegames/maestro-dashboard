import React from 'react'
import { BackButton } from 'components/common'
import Form from 'components/schedulers/form'
import { createScheduler } from 'actions/schedulers'
import { Small } from 'components/common/responsive'

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
    <Small>
      <Form
        header={{
          left: headerLeft()
        }}
        isBlank
        handleSubmit={this.handleSubmit}
      />
    </Small>
  )
}

export default SchedulersNew

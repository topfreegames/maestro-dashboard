import React from 'react'
import { css } from 'glamor'
import Scheduler from 'containers/schedulers/scheduler'
import { Spinner } from 'components/common'
import styles from 'constants/styles'

const Schedulers = ({
  activeTimeframe,
  tvMode,
  globalMode,
  schedulerFilter,
  toggleUpdateSchedulerConfirmation,
  schedulers,
  fetching
}) => (
  <div {...Schedulers.styles}>
    {(fetching && schedulers.length === 0) &&
      <Spinner r={0} g={0} b={0} />}
    {(!fetching || schedulers.length > 0) &&
      schedulers.map(s => <Scheduler
        key={`${s.name}/${s.region}`}
        {...s}
        activeTimeframe={activeTimeframe}
        tvMode={tvMode}
        globalMode={globalMode}
        toggleConfirmation={toggleUpdateSchedulerConfirmation}
      />)
    }
  </div>
)

Schedulers.styles = css({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',

  [`@media(min-width: ${styles.sizes.minLarge})`]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '15px 0'
  }
})

export default Schedulers

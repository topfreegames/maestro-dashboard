import React from 'react'
import { css } from 'glamor'
import Scheduler from 'containers/schedulers/scheduler'
import { Spinner } from 'components/common'
import styles from 'constants/styles'
import { randomString } from 'helpers/common'

const Schedulers = ({
  tvMode,
  schedulerFilter,
  schedulers,
  fetching
}) => (
  <div {...Schedulers.styles}>
    {(fetching && schedulers.length === 0) &&
      <Spinner r={0} g={0} b={0} />}
    {(!fetching || schedulers.length > 0) &&
      schedulers.map(s => <Scheduler
        key={`${s.name}${randomString(4)}`} {...s}
        tvMode={tvMode}
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
    padding: '15px'
  }
})

export default Schedulers

import React from 'react'
import { css } from 'glamor'
import Scheduler from 'containers/schedulers/scheduler'
import { Spinner } from 'components/common'
import styles from 'constants/styles'

const Schedulers = ({
  activeTimeframe,
  tvMode,
  schedulerFilter,
  schedulers,
  fetching
}) => (
  <div {...Schedulers.styles} {...Schedulers.stylesWithTvMode({ isActive: !!tvMode })}>
    {(fetching && schedulers.length === 0) &&
      <Spinner r={0} g={0} b={0} />}
    {(!fetching || schedulers.length > 0) &&
      schedulers.map(s => <Scheduler
        key={`${s.name}`} {...s}
        activeTimeframe={activeTimeframe}
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

Schedulers.stylesWithTvMode = ({ isActive } = { isActive: false }) =>
  isActive ? css({
    transformOrigin: 'top',
    transform: 'scale(1.2)'
  }) : {}

export default Schedulers

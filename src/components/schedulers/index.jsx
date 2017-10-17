import React from 'react'
import { css } from 'glamor'
import Scheduler from 'containers/schedulers/scheduler'
import { Spinner, AddButton } from 'components/common'
import styles from 'constants/styles'
import { navigate } from 'actions/common'
import { randomString } from 'helpers/common'

const newScheduler = event => {
  event.preventDefault()
  navigate('/schedulers/new')
}

const Schedulers = ({
  schedulerFilter,
  schedulers,
  fetching
}) => (
  <div {...Schedulers.styles}>
    {(fetching && schedulers.length === 0) &&
      <Spinner r={0} g={0} b={0} />}
    {(!fetching || schedulers.length > 0) &&
      schedulers.map(s => <Scheduler key={`${s.name}${randomString(4)}`} {...s} />)}
    <AddButton handleClick={newScheduler} />
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

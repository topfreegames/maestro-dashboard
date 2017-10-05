import React from 'react'
import { css } from 'glamor'
import Scheduler from 'containers/schedulers/scheduler'
import { AddButton } from 'components/common'
import styles from 'constants/styles'
import { navigate } from 'actions/common'

const newScheduler = event => {
  event.preventDefault()
  navigate('/schedulers/new')
}

const Schedulers = ({ filter, schedulers, fetching }) => (
  <div {...Schedulers.styles}>
    {filter !== '' &&
      <div className='results'>Results for <span>{filter}</span></div>}
    {(!fetching || schedulers.length > 0) &&
      schedulers.map(s => <Scheduler key={s.name} {...s} />)}
    <AddButton handleClick={newScheduler} />
  </div>
)

Schedulers.styles = css({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
  padding: '16px',

  '> .results': {
    fontSize: styles.fontSizes['3'],
    color: styles.colors.gray_75,
    marginBottom: '16px',

    '> span': {
      color: styles.colors.brandPrimary
    }
  }
})

export default Schedulers

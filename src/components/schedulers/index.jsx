import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'
import Scheduler from 'containers/schedulers/scheduler'

const Schedulers = ({ filter, schedulers, fetching }) => (
  <div {...Schedulers.styles}>
    {filter !== '' &&
      <div className='results'>Results for <span>{filter}</span></div>}
    {(!fetching || schedulers.length > 0) &&
      schedulers.map(s => <Scheduler key={s.name} {...s} />)}
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

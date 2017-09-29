import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'
import Scheduler from 'containers/schedulers/scheduler'

const Schedulers = props => (
  <div {...Schedulers.styles}>
    {(!props.fetching || props.schedulers.length > 0) &&
      props.schedulers.map(s => <Scheduler key={s.name} {...s} />)}
  </div>
)

Schedulers.styles = css({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
  padding: '16px'
})

export default Schedulers

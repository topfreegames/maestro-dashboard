import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const Scheduler = props => (
  <div {...Scheduler.styles}>
    <div>
      <div>{props.name}</div>
      <div>{props.game}</div>
    </div>
    <div>REPLICAS</div>
  </div>
)

Scheduler.styles = css({
  flexDirection: 'column',

  '> div:nth-of-type(1)': {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: styles.fontSizes['2'],

    '> div:nth-of-type(1)': {
      color: styles.colors.gray_100
    },

    '> div:nth-of-type(2)': {
      color: styles.colors.gray_75
    }
  },

  '> div:nth-of-type(2)': {
    fontSize: styles.fontSizes['1'],
    color: styles.colors.gray_100,
    margin: '8px 0'
  }
})

export default Scheduler

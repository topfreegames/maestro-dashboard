import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'
import Scheduler from './scheduler'

const Schedulers = props => (
  <div {...Schedulers.styles}>
    {!props.fetching && props.schedulers.map(s => <Scheduler key={s.name} {...s} />)}
  </div>
)

Schedulers.styles = css({
  display: 'flex',
  boxSizing: 'border-box',

  [`@media (min-width: ${styles.minWidth}) and (max-width: ${styles.maxWidth})`]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '0 30px 30px'
  },

  [`@media(max-width: ${styles.minWidth})`]: {
    flexDirection: 'column',
    padding: '16px',

    '> div + div': {
      marginTop: '16px'
    }
  },

  '> div': {
    display: 'flex',
    boxSizing: 'border-box',
    border: `1px solid ${styles.colors.gray_25}`,

    [`@media (min-width: ${styles.minWidth}) and (max-width: ${styles.maxWidth})`]: {
      backgroundColor: styles.colors.white,
      padding: '10px 20px'
    },

    [`@media (min-width: 1200px)`]: {
      minWidth: '32%',
      maxWidth: '32%',
      marginBottom: '20px'
    },

    [`@media (min-width: 800px) and (max-width: 1200px)`]: {
      minWidth: '48%',
      maxWidth: '48%',
      marginBottom: '20px'
    },

    [`@media (min-width: ${styles.minWidth}) and (max-width: 800px)`]: {
      minWidth: '100%',
      maxWidth: '100%',
      marginBottom: '20px'
    },

    [`@media(max-width: ${styles.minWidth})`]: {
      border: 'none',
      boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.3)',
      padding: '10px'
    }
  }
})

export default Schedulers

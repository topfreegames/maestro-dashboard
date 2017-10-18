import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const timeframes = ([
  {
    timeframe: '1_hour',
    label: '1',
    unit: 'h'
  },
  {
    timeframe: '4_hours',
    label: '4',
    unit: 'h'
  },
  {
    timeframe: '1_day',
    label: '1',
    unit: 'd'
  },
  {
    timeframe: '2_days',
    label: '2',
    unit: 'd'
  },
  {
    timeframe: '1_week',
    label: '1',
    unit: 'w'
  }
])

const Timeframes = ({ changeTimeframe, activeTimeframe }) => (
  <ul {...Timeframes.styles}>
    {
      timeframes.map(({ timeframe, label, unit }) => (
        <li
          key={timeframe}
          className={activeTimeframe === timeframe && 'active'}
          onClick={() => changeTimeframe(timeframe)}
        >
          {label} <span>{unit}</span>
        </li>
      ))
    }
  </ul>
)

Timeframes.styles = css({
  display: 'flex',
  justifyContent: 'space-around',
  listStyleType: 'none',

  '> li': {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3px 8px',
    borderRadius: '3px',
    border: `1px solid ${styles.colors.gray_25}`,
    fontSize: styles.fontSizes['2'],
    textTransform: 'uppercase',
    color: styles.colors.gray_75,
    fontWeight: 500,
    cursor: 'pointer',

    '& span': {
      fontSize: styles.fontSizes['1'],
      fontWeight: 400
    },

    '& + li': {
      marginLeft: '10px'
    },

    '&.active': {
      color: styles.colors.gray_100,
      backgroundColor: styles.colors.gray_25,
      transition: 'all 80ms ease-in'
    }
  }
})

export default Timeframes

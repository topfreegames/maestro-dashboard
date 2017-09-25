import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const Scheduler = props => (
  <div {...Scheduler.styles}>
    <div>
      <label>Scheduler</label>
      <div>{props.name}</div>
      <label>Game</label>
      <div>{props.game}</div>
      <div>Save</div>
    </div>
    <div>
      <div>Replicas</div>
      <label>Minimum</label>
      <div>{props.autoscaling.min}</div>
      <label>Current</label>
      <div>3</div>
    </div>
    <div>
      <div>Room Status</div>
      <label>Ready</label>
      <div>{props.status.roomsAtReady}</div>
      <label>Occupied</label>
      <div>{props.status.roomsAtOccupied}</div>
    </div>
  </div>
)

Scheduler.styles = css({
  flexDirection: 'row',
  justifyContent: 'space-between',
  color: styles.colors.gray_100,
  fontSize: styles.fontSizes['3'],

  '> div': {
    '> label, > div:nth-of-type(1)': {
      textTransform: 'uppercase',
      fontSize: styles.fontSizes['1'],
      fontWeight: 700,
      color: styles.colors.gray_50
    },

    '> div:nth-of-type(1)': {
      color: styles.colors.gray_75
    }
  },

  '> div:nth-of-type(1)': {
    '> div:nth-of-type(1)': {
      textTransform: 'none',
      fontSize: styles.fontSizes['3'],
      fontWeight: 400,
      color: styles.colors.gray_100
    },

    '> div:nth-of-type(3)': {
      textAlign: 'center',
      marginTop: '12px',
      padding: '6px 0',
      fontSize: styles.fontSizes['2'],
      fontWeight: 700,
      backgroundColor: styles.colors.yellow,
      borderRadius: '4px',
      alignSelf: 'start'
    }
  }
})

export default Scheduler
